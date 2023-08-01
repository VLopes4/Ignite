export class Slug {
  public value: string
  
  constructor(value: string) {
    this.value = value
  }

  /**
   * Descrption: Recebe uma string e converte ela para Slug
   * 
   * Example: "Um título de exemplo" => "um-titulo-de-exemplo"
   * 
   *  @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize("NFKD")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }
}