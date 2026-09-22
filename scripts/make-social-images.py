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
#
# 白基調＋青のグラデーション。参考にしたサービスから配色の方向性のみを
# 取っている（ロゴの意匠は模倣しない）。
PALETTE = {
    # 濃色面のグラデーション（上 → 下）。深い青から明るい青へ。
    "bg_top": (0x01, 0x3B, 0x9E),
    "bg_bottom": (0x02, 0x7D, 0xDB),
    # 淡色面
    "light": (0xFF, 0xFF, 0xFF),
    "light_sub": (0xF2, 0xF6, 0xFB),
    # 文字
    "text": (0xFF, 0xFF, 0xFF),        # 濃色面の上に置く文字
    "text_dark": (0x28, 0x16, 0x13),   # 淡色面の上に置く文字（やや暖色の黒）
    "text_sub": (0x6B, 0x7A, 0x90),    # 補足文
    # アクセント
    "accent": (0x02, 0x7D, 0xDB),
    "accent_deep": (0x01, 0x3B, 0x9E),
    "accent_light": (0x73, 0xBC, 0xED),
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
    """400x400。青のグラデーション地・白文字。

    Xのタイムラインは白背景なので、こちらを主に使うと埋もれない。
    """
    S = 400
    p = PALETTE
    img = vertical_gradient((S, S), p["bg_top"], p["bg_bottom"])
    d = ImageDraw.Draw(img)
    _wordmark(d, S, p, p["text"], p["text"], p["accent_light"])
    return img


def make_icon_b():
    """400x400。白地・濃色文字。

    白背景のサービス（noteなど）で使う。Xの明るいテーマだと
    背景と同化するため、縁に細い枠を入れて輪郭を残している。
    """
    S = 400
    p = PALETTE
    img = Image.new("RGB", (S, S), p["light"])
    d = ImageDraw.Draw(img)

    ring = max(4, int(S * 0.022))
    d.ellipse([ring / 2, ring / 2, S - ring / 2, S - ring / 2],
              outline=p["accent"], width=ring)

    _wordmark(d, S, p, p["text_dark"], p["accent"], p["accent"])
    return img


# ---------------------------------------------------------------- ヘッダー
LEFT = 440  # プロフィール画像が重なる領域を避ける


def stripes(d, W, H, p, dark_bg):
    """右側の斜めの帯。背景の明暗に応じて色を変える。"""
    if dark_bg:
        back, front = p["accent_deep"], p["accent_light"]
    else:
        back, front = p["accent_light"], p["accent"]

    d.polygon([(W * 0.70, H), (W * 0.83, 0), (W * 0.90, 0), (W * 0.77, H)],
              fill=back)
    d.polygon([(W * 0.80, H), (W * 0.93, 0), (W * 1.02, 0), (W * 0.89, H)],
              fill=front)


def make_header():
    """白地。キャリカミ寄りの明るいトーン。"""
    W, H = 1500, 500
    p = PALETTE
    img = vertical_gradient((W, H), p["light"], p["light_sub"])
    d = ImageDraw.Draw(img)
    stripes(d, W, H, p, dark_bg=False)

    d.text((LEFT, H * 0.20), "ゼロイチIT", font=font(34), fill=p["accent"],
           anchor="lm")
    d.text((LEFT, H * 0.43), "IT未経験の転職を、", font=font(58), fill=p["text_dark"],
           anchor="lm")
    d.text((LEFT, H * 0.63), "調べて書いています。", font=font(58), fill=p["text_dark"],
           anchor="lm")
    d.text((LEFT, H * 0.84), "高卒・専門卒・フリーター・異業種から　／　相談は無料",
           font=font(28), fill=p["text_sub"], anchor="lm")

    return img


def make_header_b():
    """青地。コピーが主役の版。"""
    W, H = 1500, 500
    p = PALETTE
    img = vertical_gradient((W, H), p["bg_top"], p["bg_bottom"])
    d = ImageDraw.Draw(img)
    stripes(d, W, H, p, dark_bg=True)

    d.text((LEFT, H * 0.22), "ゼロイチIT", font=font(32), fill=p["accent_light"],
           anchor="lm")
    # 青地の上では明るい青が沈む。強調したい2行目を白にする。
    d.text((LEFT, H * 0.48), "「自分には無縁」を、", font=font(64),
           fill=p["accent_light"], anchor="lm")
    d.text((LEFT, H * 0.70), "終わらせる。", font=font(64), fill=p["text"],
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
