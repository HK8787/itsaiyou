"""note記事の見出し画像を生成する。

noteの推奨サイズは 1280x670。
記事一覧では小さく表示されるので、タイトル以外は入れない。
写真やイラストより、タイトルが読めるほうがクリックされる。

記事を足したら ARTICLES に1行足して実行する。
"""

import os

from PIL import Image, ImageDraw, ImageFont

FONT = "/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf"
OUT = "/home/user/itsaiyou/public/social/note"

DEEP_FROM = (0x01, 0x3B, 0x9E)
DEEP_TO = (0x01, 0x68, 0xC2)
ACCENT_LIGHT = (0x7C, 0xC0, 0xF7)
WHITE = (0xFF, 0xFF, 0xFF)

W, H = 1280, 670
MARGIN = 96

# (ファイル名, タイトル, 上部の小見出し)
ARTICLES = [
    ("01-job-map",
     "「未経験からIT」で調べた人が、\n最初に知るべきだったこと",
     "職種の違い"),
    ("02-money",
     "未経験ITの1年目、\n手取りはいくらか。",
     "お金の話"),
    ("03-yametoke",
     "「未経験からITはやめとけ」を、\n一個ずつ検証してみた",
     "よくある通説"),
    ("04-why-it",
     "未経験の面接で\n「なぜIT業界なのか」に\n答えられない人へ",
     "面接対策"),
]


def font(size):
    return ImageFont.truetype(FONT, size)


def diagonal_gradient(size, c0, c1):
    w, h = size
    small = Image.new("RGB", (64, 64))
    px = small.load()
    for y in range(64):
        for x in range(64):
            t = (x * 0.45 + y * 0.55) / 63
            px[x, y] = tuple(round(c0[i] + (c1[i] - c0[i]) * t) for i in range(3))
    return small.resize((w, h), Image.BICUBIC)


def stairs(d, x, y, size, color, sw=5.4):
    """ロゴマーク。src/components/Logo.tsx と同じ形。"""
    k = size / 32
    stroke = max(1, int(round(sw * k)))
    pts32 = [(8, 23.5), (15, 23.5), (15, 16), (22, 16), (22, 8.5)]
    pts = [(x + px * k, y + py * k) for px, py in pts32]
    d.line(pts, fill=color, width=stroke, joint="curve")
    r = stroke / 2
    for px, py in (pts[0], pts[-1]):
        d.ellipse([px - r, py - r, px + r, py + r], fill=color)


def fit_title(d, lines, avail_w, start=64, min_size=34):
    """全行が avail_w に収まる最大のフォントサイズを返す。"""
    size = start
    while size > min_size:
        f = font(size)
        if max(d.textlength(line, font=f) for line in lines) <= avail_w:
            break
        size -= 2
    return font(size)


def make(title, eyebrow):
    img = diagonal_gradient((W, H), DEEP_FROM, DEEP_TO)
    d = ImageDraw.Draw(img)

    # 上の小見出し。記事の分類が一目で分かるようにする。
    d.text((MARGIN, 110), eyebrow, font=font(28), fill=ACCENT_LIGHT, anchor="lm")
    d.line([(MARGIN, 138), (MARGIN + 54, 138)], fill=ACCENT_LIGHT, width=3)

    lines = title.split("\n")
    f = fit_title(d, lines, W - MARGIN * 2)

    # タイトルを縦中央に置く
    lh = f.size * 1.55
    top = H / 2 - (len(lines) - 1) * lh / 2 - 10
    for i, line in enumerate(lines):
        d.text((MARGIN, top + i * lh), line, font=f, fill=WHITE, anchor="lm")

    # 下に屋号とマーク
    mark = 40
    my = H - MARGIN + 4
    d.rounded_rectangle([MARGIN, my, MARGIN + mark, my + mark],
                        radius=mark * 0.25, fill=WHITE)
    stairs(d, MARGIN, my, mark, DEEP_FROM, sw=5.0)
    d.text((MARGIN + mark + 14, my + mark / 2), "ゼロイチIT", font=font(28),
           fill=WHITE, anchor="lm")

    return img


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, title, eyebrow in ARTICLES:
        im = make(title, eyebrow)
        path = f"{OUT}/{name}.png"
        im.save(path)
        print(name, im.size, os.path.getsize(path) // 1024, "KB")
