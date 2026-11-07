/**
 * Módulo de Demonstração JavaScript
 * Validação de coloração sintática e preservação de recuos
 */
class DocumentValidator {
  constructor(documentName) {
    this.documentName = documentName;
    this.validations = [];
  }

  addCheck(ruleName, fn) {
    this.validations.push({ ruleName, fn });
    return this;
  }

  async runAll(context) {
    const results = [];
    for (const { ruleName, fn } of this.validations) {
      const pass = await fn(context);
      results.push({ ruleName, pass });
    }
    return results;
  }
}

module.exports = { DocumentValidator };
