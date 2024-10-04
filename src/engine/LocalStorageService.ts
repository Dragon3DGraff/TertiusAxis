export class LocalStorageService {
  constructor() {}

  static getSavedParam(fieldName: string) {
    try {
      const saved = localStorage.getItem(fieldName);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error(error);
    }
  }

  static saveParam(fieldName: string, data: Record<string, any> | string|number) {
    localStorage.setItem(fieldName, JSON.stringify(data));
  }
}
