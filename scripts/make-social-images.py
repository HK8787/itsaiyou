"""X・note用のアイコンとヘッダー画像を生成する。

配色を変えたいときは PALETTE だけ書き換えれば全画像に反映される。

設計上の制約
  アイコン : Xでは円形に切り抜かれ、タイムラインでは32〜48pxまで縮む。
             その大きさで和文は読めないので、文字を入れずマークだけにする。
             名前は表示名が担当する。マークは Logo.tsx と同じ形。
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
def stairs(d, x, y, size, color, sw=5.4):
    """上り階段のマーク。

    src/components/Logo.tsx と同じ形。viewBox 32 の座標をそのまま拡大する。
    段を2つに留めているのは、3段だと小さいサイズで潰れて
    稲妻のように見えるため。
    """
    k = size / 32
    stroke = int(round(sw * k))
    pts32 = [(8, 23.5), (15, 23.5), (15, 16), (22, 16), (22, 8.5)]
    pts = [(x + px * k, y + py * k) for px, py in pts32]
    d.line(pts, fill=color, width=stroke, joint="curve")
    # PILのlineは端が角のままなので、両端に円を置いて丸める
    r = stroke / 2
    for px, py in (pts[0], pts[-1]):
        d.ellipse([px - r, py - r, px + r, py + r], fill=color)


def make_icon():
    """400x400。青のグラデーション地・白いマーク。

    Xのタイムラインでは32〜48pxまで縮む。その大きさで和文は読めないので、
    文字は入れずマークだけにする。名前は表示名が担当する。
    """
    S = 400
    p = PALETTE
    img = vertical_gradient((S, S), p["bg_top"], p["bg_bottom"])
    d = ImageDraw.Draw(img)
    stairs(d, 0, 0, S, p["text"])
    return img


def make_icon_b():
    """400x400。白地・青いマーク。

    白背景のサービスで使う。Xの明るいテーマだと背景と同化するため、
    縁に枠を入れて輪郭を残している。
    """
    S = 400
    p = PALETTE
    img = Image.new("RGB", (S, S), p["light"])
    d = ImageDraw.Draw(img)

    ring = max(4, int(S * 0.022))
    d.ellipse([ring / 2, ring / 2, S - ring / 2, S - ring / 2],
              outline=p["accent"], width=ring)
    stairs(d, 0, 0, S, p["accent"])
    return img


# ---------------------------------------------------------------- ヘッダー
LEFT = 440  # プロフィール画像が重なる領域を避ける


def stripes(d, W, H, p, dark_bg):
    """右側の斜めの帯。背景の明暗に応じて色を変える。"""
    if dark_bg:
        back, front = p["accent_deep"], p["accent_light"]
    else:
        back, front = p["accent_light"], p["accent"]

    # 見出しと重ならないよう右端に寄せている。値を小さくすると文字にかかる。
    d.polygon([(W * 0.80, H), (W * 0.93, 0), (W * 0.99, 0), (W * 0.86, H)],
              fill=back)
    d.polygon([(W * 0.89, H), (W * 1.02, 0), (W * 1.10, 0), (W * 0.97, H)],
              fill=front)


def _header_base(p, dark):
    """ヘッダーの下地。帯まで引いた状態で返す。"""
    W, H = 1500, 500
    if dark:
        img = vertical_gradient((W, H), p["bg_top"], p["bg_bottom"])
    else:
        img = vertical_gradient((W, H), p["light"], p["light_sub"])
    d = ImageDraw.Draw(img)
    stripes(d, W, H, p, dark_bg=dark)
    return img, d, W, H


def _header(copy1, copy2, sub, dark=False, size=58):
    """見出し2行＋補足1行のヘッダー。

    文言だけ差し替えて使う。レイアウトは共通。
    見出しは右の帯にかからないよう、長い文言では自動で縮む。
    """
    p = PALETTE
    img, d, W, H = _header_base(p, dark)

    brand = p["accent_light"] if dark else p["accent"]
    body = p["text"] if dark else p["text_dark"]
    sub_color = p["accent_light"] if dark else p["text_sub"]

    # 帯の左端（W*0.80）の手前で折り返す
    avail = W * 0.80 - LEFT - 24
    f = font(size)
    while size > 30 and max(d.textlength(c, font=f) for c in (copy1, copy2)) > avail:
        size -= 2
        f = font(size)

    # 屋号の左にマークを置く。サイト・アイコンと同じ形にして、
    # どの媒体で見ても同じブランドだと分かるようにする。
    mark = 46
    mark_y = H * 0.20 - mark / 2
    d.rounded_rectangle([LEFT, mark_y, LEFT + mark, mark_y + mark],
                        radius=mark * 0.25,
                        fill=p["accent"] if not dark else p["accent_light"])
    stairs(d, LEFT, mark_y, mark,
           p["light"] if not dark else p["bg_top"], sw=5.0)

    d.text((LEFT + mark + 14, H * 0.20), "ゼロイチIT", font=font(34),
           fill=brand, anchor="lm")
    d.text((LEFT, H * 0.43), copy1, font=f, fill=body, anchor="lm")
    d.text((LEFT, H * 0.63), copy2, font=f, fill=body, anchor="lm")

    f_sub = font(27)
    while d.textlength(sub, font=f_sub) > avail + 40:
        f_sub = font(f_sub.size - 1)
    d.text((LEFT, H * 0.84), sub, font=f_sub, fill=sub_color, anchor="lm")

    return img


SUB = "高卒・専門卒・フリーター歓迎　／　しつこい連絡はしません"

COPY1 = "ひとりで決めなくて、いい。"
COPY2 = "IT未経験の転職、一緒に考えます。"


def make_header():
    """白地。Xとnoteのヘッダーはこれを使う。

    「一緒に考えます」で、読んだ人に何が起きるかを一行で伝える。
    「しつこい連絡はしません」は、無料相談で身構える最大の理由を
    先に潰すために入れている。
    """
    return _header(COPY1, COPY2, SUB)


def make_header_b():
    """青地。背景の明るい媒体で使う場合の予備。"""
    return _header(COPY1, COPY2, SUB, dark=True)


def make_note_header():
    """noteのヘッダー。1920x1006。

    Xの1500x500（3:1）をそのまま使うと、noteが縦に引き伸ばして
    文字だけが巨大に表示される。比率が違うので専用に作る。

    noteはアイコンをヘッダーの下端左に重ねるので、
    下側と左端には文字を置かない。
    """
    W, H = 1920, 1006
    p = PALETTE
    img = vertical_gradient((W, H), p["light"], p["light_sub"])
    d = ImageDraw.Draw(img)

    # 右側の帯。Xヘッダーと同じ意匠だが、縦長なので角度を寝かせる。
    d.polygon([(W * 0.74, H), (W * 0.90, 0), (W * 0.97, 0), (W * 0.81, H)],
              fill=p["accent_light"])
    d.polygon([(W * 0.84, H), (W * 1.00, 0), (W * 1.09, 0), (W * 0.93, H)],
              fill=p["accent"])

    LEFT_N = 150
    mark = 62
    mark_y = H * 0.24 - mark / 2
    d.rounded_rectangle([LEFT_N, mark_y, LEFT_N + mark, mark_y + mark],
                        radius=mark * 0.25, fill=p["accent"])
    stairs(d, LEFT_N, mark_y, mark, p["light"], sw=5.0)
    d.text((LEFT_N + mark + 18, H * 0.24), "ゼロイチIT", font=font(44),
           fill=p["accent"], anchor="lm")

    d.text((LEFT_N, H * 0.46), COPY1, font=font(76), fill=p["text_dark"],
           anchor="lm")
    d.text((LEFT_N, H * 0.60), COPY2, font=font(76), fill=p["text_dark"],
           anchor="lm")

    # 下端はアイコンが重なるので、補足行はその手前で止める
    d.text((LEFT_N, H * 0.74), SUB, font=font(34), fill=p["text_sub"],
           anchor="lm")

    return img


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)

    files = {
        "x-icon": make_icon(),
        "x-icon-b": make_icon_b(),
        "x-header": make_header(),
        "x-header-b": make_header_b(),
        "note-header": make_note_header(),
    }
    for name, im in files.items():
        im.save(f"{OUT}/{name}.png")
        print(name, im.size, os.path.getsize(f"{OUT}/{name}.png") // 1024, "KB")
