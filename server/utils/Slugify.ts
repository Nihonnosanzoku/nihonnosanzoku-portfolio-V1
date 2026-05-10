export default class Slugify {
  /**
   * Converts a string to a URL-friendly slug.
   * Supports Turkish characters.
   */
  public static create(text: string): string {
    const trMap: { [key: string]: string } = {
      'ç': 'c', 'Ç': 'c',
      'ğ': 'g', 'Ğ': 'g',
      'ı': 'i', 'İ': 'i',
      'ö': 'o', 'Ö': 'o',
      'ş': 's', 'Ş': 's',
      'ü': 'u', 'Ü': 'u'
    };

    let slug = text;
    
    // Replace Turkish characters
    for (const key in trMap) {
      slug = slug.replace(new RegExp(key, 'g'), trMap[key]);
    }

    return slug
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove all non-word chars
      .replace(/[\s_-]+/g, '-')  // Replace spaces and underscores with -
      .replace(/^-+|-+$/g, '');   // Trim - from ends
  }
}
