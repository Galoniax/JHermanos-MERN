import slugify from "slugify";

export function sluglify(text) {
  return slugify(text, {
    replacement: '-',
    remove: /[*+~.()"!:@]/g,
    lower: true,
    strict: false,
    trim: true,
    locale: "es",
  })
}