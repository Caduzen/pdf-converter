"""
Módulo de Amostra Python para Conversão Fiel em PDF.
Preserva docstrings, funções, tipagem e indentação.
"""
from typing import List, Dict, Any

class ConversionReport:
    def __init__(self, suite_name: str) -> None:
        self.suite_name: str = suite_name
        self.results: List[Dict[str, Any]] = []

    def record_test(self, test_name: str, passed: bool, duration_ms: float) -> None:
        self.results.append({
            "name": test_name,
            "passed": passed,
            "duration_ms": duration_ms
        })

    def summary(self) -> Dict[str, Any]:
        total = len(self.results)
        passed = sum(1 for r in self.results if r["passed"])
        return {
            "total": total,
            "passed": passed,
            "success_rate": f"{(passed / total * 100):.1f}%" if total > 0 else "0.0%"
        }

if __name__ == "__main__":
    report = ConversionReport("Universal PDF Tests")
    report.record_test("Markdown Test", True, 120.5)
    print(report.summary())
