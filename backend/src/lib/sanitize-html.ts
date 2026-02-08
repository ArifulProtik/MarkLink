import DOMPurify from 'isomorphic-dompurify'

export const sanitizeHtml = (dirtyHtml: string) => {
  return DOMPurify.sanitize(dirtyHtml, {
    ALLOWED_TAGS: [
      'p',
      'h2',
      'br',
      'hr',
      'strong',
      'em',
      's',
      'ul',
      'ol',
      'li',
      'a',
      'img',
      'pre',
      'code',
      'span',
    ],

    ALLOWED_ATTR: [
      'href',
      'target',
      'rel',
      'src',
      'alt',
      'title',
      'width',
      'height',
      'class',
    ],

    ALLOWED_URI_REGEXP: /^(?:https?|mailto|tel|ftp):/i,

    // ADD_TAGS: ['iframe'],
    // ADD_ATTR: ['allowfullscreen', 'frameborder', 'scrolling'],
  })
}
