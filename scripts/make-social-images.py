"""X（旧Twitter）用のアイコンとヘッダー画像を生成する。

サイトと同じブランドカラーを使う。
  ink-900   #111a2e  背景
  ink-700   #253356
  flame-500 #fb5e12  アクセント
  ink-100   #e6ebf5  文字

設計上の制約
  アイコン : Xでは円形に切り抜かれ、タイムラインでは32〜48pxまで縮む。
             要素を詰めると潰れるので「0→1」だけに絞る。
  ヘッダー : 1500x500。スマホでは上下が切られ、
             左下にアイコンが重なるため、文字は x>=430 に置く。
"""

import os

from PIL import Image, ImageDraw, ImageFont

FONT = "/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf"

INK_900 = (0x11, 0x1A, 0x2E)
INK_800 = (0x1A, 0x24, 0x40)
INK_700 = (0x25, 0x33, 0x56)
INK_300 = (0x9D, 0xAE, 0xD1)
INK_100 = (0xE6, 0xEB, 0xF5)
FLAME_500 = (0xFB, 0x5E, 0x12)
FLAME_400 = (0xFF, 0x7F, 0x3C)
WHITE = (0xFF, 0xFF, 0xFF)

OUT = "/home/user/itsaiyou/public/social"


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


def arrow(d, x0, x1, y, color, shaft=9, head=26):
    """細い矢印。フォントの「→」より線が均一で、小さくしても潰れない。"""
    shaft = int(round(shaft))
    d.line([(x0, y), (x1 - head * 0.55, y)], fill=color, width=shaft)
    d.polygon(
        [(x1, y), (x1 - head, y - head * 0.62), (x1 - head, y + head * 0.62)],
        fill=color,
    )


def zero(d, cx, cy, h, color, width=20):
    """「0」をリングとして描く。

    IPAゴシックの 0 はスラッシュ付き（Ø）で、小さくすると数字に見えない。
    屋号の由来が「ゼロから1へ」である以上、ここは潰せないので自分で描く。
    """
    width = int(round(width))
    w = h * 0.68
    d.ellipse([cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2],
              outline=color, width=width)


def one(d, x, cy, h, color, width=20):
    """「0」と線の太さを揃えるため、1 も自前で描く。"""
    width = int(round(width))
    top = cy - h / 2
    bottom = cy + h / 2
    # 縦棒
    d.line([(x, top + h * 0.06), (x, bottom)], fill=color, width=width)
    # 左上のはね
    d.line([(x - h * 0.24, top + h * 0.22), (x - width * 0.2, top + h * 0.02)],
           fill=color, width=width)


# ---------------------------------------------------------------- アイコン
def glyph_row(d, S, cy, zero_color, arrow_color, one_color, h=150, width=20):
    """0 → 1 を中央揃えで1行に並べる。"""
    zero_w = h * 0.68
    # 1 は縦棒の左に「はね」が出る。その張り出し分も箱の幅に含めないと、
    # 矢印と詰まって見える。
    one_w = h * 0.24 + width
    arrow_len = 84
    gap = 30
    total = zero_w + gap + arrow_len + gap + one_w
    x = (S - total) / 2

    zero(d, x + zero_w / 2, cy, h, zero_color, width)
    x += zero_w + gap
    arrow(d, x, x + arrow_len, cy, arrow_color, shaft=width * 0.55, head=30)
    x += arrow_len + gap
    one(d, x + one_w - width / 2, cy, h, one_color, width)


def make_icon():
    """400x400。中央に 0 → 1 のみ。

    タイムラインでは32〜48pxまで縮むので、要素はこれ以上入れない。
    """
    S = 400
    img = vertical_gradient((S, S), INK_700, INK_900)
    d = ImageDraw.Draw(img)

    glyph_row(d, S, S * 0.5, INK_300, FLAME_500, WHITE)

    return img


def make_icon_b():
    """反転版。背景がオレンジで、タイムライン上で目立つ。"""
    S = 400
    img = Image.new("RGB", (S, S), FLAME_500)
    d = ImageDraw.Draw(img)

    glyph_row(d, S, S * 0.5, (0xFF, 0xCD, 0xAA), WHITE, WHITE)

    return img


# ---------------------------------------------------------------- ヘッダー
LEFT = 440  # アイコンが重なる領域を避ける


def stripes(d, W, H):
    """右側の斜めの帯。右端で切れないよう、画面内に収める。"""
    d.polygon([(W * 0.70, H), (W * 0.83, 0), (W * 0.90, 0), (W * 0.77, H)],
              fill=INK_700)
    d.polygon([(W * 0.80, H), (W * 0.93, 0), (W * 1.02, 0), (W * 0.89, H)],
              fill=FLAME_500)


def make_header():
    """本文が主役の版。何をしている人かを1行で伝える。"""
    W, H = 1500, 500
    img = vertical_gradient((W, H), INK_800, INK_900)
    d = ImageDraw.Draw(img)
    stripes(d, W, H)

    d.text((LEFT, H * 0.20), "ゼロイチIT", font=font(34), fill=FLAME_400, anchor="lm")

    d.text((LEFT, H * 0.43), "IT未経験の転職を、", font=font(58), fill=WHITE, anchor="lm")
    d.text((LEFT, H * 0.63), "調べて書いています。", font=font(58), fill=WHITE, anchor="lm")

    d.text((LEFT, H * 0.84), "高卒・専門卒・フリーター・異業種から　／　相談は無料",
           font=font(28), fill=INK_300, anchor="lm")

    return img


def make_header_b():
    """コピーが主役の版。文字が大きく、スマホでも読める。"""
    W, H = 1500, 500
    img = vertical_gradient((W, H), INK_700, INK_900)
    d = ImageDraw.Draw(img)
    stripes(d, W, H)

    d.text((LEFT, H * 0.22), "ゼロイチIT", font=font(32), fill=INK_300, anchor="lm")

    d.text((LEFT, H * 0.48), "「自分には無縁」を、", font=font(64), fill=WHITE, anchor="lm")
    d.text((LEFT, H * 0.70), "終わらせる。", font=font(64), fill=FLAME_400, anchor="lm")

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
