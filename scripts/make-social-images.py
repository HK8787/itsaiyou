"""X・note用のアイコンとヘッダー画像を生成する。

配色を変えたいときは PALETTE だけ書き換えれば全画像に反映される。

設計上の制約
  アイコン : Xでは円形に切り抜かれ、タイムラインでは32〜48pxまで縮む。
             和文4文字が限界なので「ゼロイチ」＋「IT」の2段組みにする。
  ヘッダー : 1500x500。スマホでは上下が切られ、
             左下にアイコンが重なるため、文字は x>=440 に置く。
"""

import os

from PIL import Image, ImageDraw, ImageFont

FONT = "/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf"
OUT = "/home/user/itsaiyou/public/social"


# ---------------------------------------------------------------- 配色
# ここだけ差し替えればトーンを丸ごと変えられる。
PALETTE = {
    # 背景のグラデーション（上 → 下）
    "bg_top": (0x25, 0x33, 0x56),      # ink-700
    "bg_bottom": (0x11, 0x1A, 0x2E),   # ink-900
    # ヘッダー背景（アイコンより少し明るく）
    "header_top": (0x1A, 0x24, 0x40),  # ink-800
    "header_bottom": (0x11, 0x1A, 0x2E),
    # 文字
    "text": (0xFF, 0xFF, 0xFF),
    "text_sub": (0x9D, 0xAE, 0xD1),    # ink-300
    # アクセント
    "accent": (0xFB, 0x5E, 0x12),      # flame-500
    "accent_light": (0xFF, 0x7F, 0x3C),  # flame-400
    "accent_pale": (0xFF, 0xCD, 0xAA),  # flame-200
    # 帯の影側
    "band_dark": (0x25, 0x33, 0x56),   # ink-700
}


def font(size):
    return ImageFont.truetype(FONT, size)


def vertical_gradient(size, top, bottom):
    """上下方向のグラデーション。単色だと平坦に見えるので薄くかける。"""
    w, h = size
    base = Image.new("RGB", (1, h))
    px = base.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        px[0, y] = tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
    return base.resize((w, h), Image.BILINEAR)


def fit_font(d, text, target_w, start, min_size=10):
    """target_w に収まる最大のフォントサイズを返す。"""
    size = start
    while size > min_size and d.textlength(text, font=font(size)) > target_w:
        size -= 2
    return font(size)


# ---------------------------------------------------------------- アイコン
def draw_it(d, cx, cy, h, color, stroke):
    """「IT」を線で描く。

    IPAゴシックの I はセリフ付きで、ロゴに置くと「工」に見えてしまう。
    ジオメトリックに描いたほうがワードマークとして締まる。
    """
    stroke = int(round(stroke))
    top, bottom = cy - h / 2, cy + h / 2
    t_w = h * 0.74          # T の横棒の幅
    gap = h * 0.30          # I と T の間隔
    total = stroke + gap + t_w
    x = cx - total / 2

    # I（縦棒のみ）
    ix = x + stroke / 2
    d.line([(ix, top), (ix, bottom)], fill=color, width=stroke)

    # T
    tx = x + stroke + gap + t_w / 2
    d.line([(tx - t_w / 2, top + stroke / 2), (tx + t_w / 2, top + stroke / 2)],
           fill=color, width=stroke)
    d.line([(tx, top), (tx, bottom)], fill=color, width=stroke)


def _wordmark(d, S, p, text_color, it_color, rule_color):
    """「ゼロイチ」＋ルール＋「IT」を縦に積む。

    円形に切り抜かれるため、横幅は直径の 70% 程度に抑える。
    """
    inner = S * 0.70

    f_main = fit_font(d, "ゼロイチ", inner, int(S * 0.24))

    d.text((S / 2, S * 0.40), "ゼロイチ", font=f_main, fill=text_color, anchor="mm")

    # 区切りの横線。文字幅にそろえる。
    main_w = d.textlength("ゼロイチ", font=f_main)
    stroke = max(3, int(S * 0.020))
    y_rule = S * 0.565
    d.line(
        [(S / 2 - main_w / 2, y_rule), (S / 2 + main_w / 2, y_rule)],
        fill=rule_color,
        width=stroke,
    )

    draw_it(d, S / 2, S * 0.715, S * 0.15, it_color, stroke)


def make_icon():
    """400x400。紺地・白文字。"""
    S = 400
    p = PALETTE
    img = vertical_gradient((S, S), p["bg_top"], p["bg_bottom"])
    d = ImageDraw.Draw(img)
    _wordmark(d, S, p, p["text"], p["accent_light"], p["accent"])
    return img


def make_icon_b():
    """400x400。アクセント地・白文字。タイムラインで目立つ。"""
    S = 400
    p = PALETTE
    img = Image.new("RGB", (S, S), p["accent"])
    d = ImageDraw.Draw(img)
    _wordmark(d, S, p, p["text"], p["accent_pale"], p["text"])
    return img


# ---------------------------------------------------------------- ヘッダー
LEFT = 440  # プロフィール画像が重なる領域を避ける


def stripes(d, W, H, p):
    """右側の斜めの帯。"""
    d.polygon([(W * 0.70, H), (W * 0.83, 0), (W * 0.90, 0), (W * 0.77, H)],
              fill=p["band_dark"])
    d.polygon([(W * 0.80, H), (W * 0.93, 0), (W * 1.02, 0), (W * 0.89, H)],
              fill=p["accent"])


def make_header():
    """何をしている人かを説明する版。"""
    W, H = 1500, 500
    p = PALETTE
    img = vertical_gradient((W, H), p["header_top"], p["header_bottom"])
    d = ImageDraw.Draw(img)
    stripes(d, W, H, p)

    d.text((LEFT, H * 0.20), "ゼロイチIT", font=font(34), fill=p["accent_light"],
           anchor="lm")
    d.text((LEFT, H * 0.43), "IT未経験の転職を、", font=font(58), fill=p["text"],
           anchor="lm")
    d.text((LEFT, H * 0.63), "調べて書いています。", font=font(58), fill=p["text"],
           anchor="lm")
    d.text((LEFT, H * 0.84), "高卒・専門卒・フリーター・異業種から　／　相談は無料",
           font=font(28), fill=p["text_sub"], anchor="lm")

    return img


def make_header_b():
    """コピーが主役の版。"""
    W, H = 1500, 500
    p = PALETTE
    img = vertical_gradient((W, H), p["bg_top"], p["bg_bottom"])
    d = ImageDraw.Draw(img)
    stripes(d, W, H, p)

    d.text((LEFT, H * 0.22), "ゼロイチIT", font=font(32), fill=p["text_sub"],
           anchor="lm")
    d.text((LEFT, H * 0.48), "「自分には無縁」を、", font=font(64), fill=p["text"],
           anchor="lm")
    d.text((LEFT, H * 0.70), "終わらせる。", font=font(64), fill=p["accent_light"],
           anchor="lm")

    return img


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)

    files = {
        "x-icon": make_icon(),
        "x-icon-b": make_icon_b(),
        "x-header": make_header(),
        "x-header-b": make_header_b(),
    }
    for name, im in files.items():
        im.save(f"{OUT}/{name}.png")
        print(name, im.size, os.path.getsize(f"{OUT}/{name}.png") // 1024, "KB")
