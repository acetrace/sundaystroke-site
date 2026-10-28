import { calculate } from '../utils/handicapCalculator';
import type { RoundInput } from '../types/handicap';

function requireElement<T extends Element>(selector: string, type: new () => T): T {
  const element = document.querySelector(selector);
  if (!(element instanceof type)) throw new Error(`Missing ${selector}`);
  return element;
}

function fieldValue(row: Element, name: string): string {
  const input = row.querySelector(`input[name="${name}"]`);
  if (!(input instanceof HTMLInputElement)) throw new Error(`Missing ${name} input`);
  return input.value;
}

const form = requireElement('#handicap-form', HTMLFormElement);
const rows = requireElement('#handicap-rows', HTMLDivElement);
const result = requireElement('#handicap-result', HTMLOutputElement);
const addRound = requireElement('#add-round', HTMLButtonElement);
const maxRows = Number(form.dataset.maxRows);

function update(): void {
  const inputs: RoundInput[] = Array.from(rows.querySelectorAll('.handicap-row')).map((row) => ({
    score: fieldValue(row, 'score'),
    rating: fieldValue(row, 'rating'),
    slope: fieldValue(row, 'slope'),
  }));
  result.textContent = calculate(inputs).message;
}

addRound.addEventListener('click', () => {
  const rowCount = rows.querySelectorAll('.handicap-row').length;
  const template = rows.querySelector('.handicap-row');
  if (template === null || rowCount >= maxRows) return;
  const row = template.cloneNode(true);
  if (!(row instanceof HTMLFieldSetElement)) return;
  row.querySelectorAll('input').forEach((input) => {
    input.value = '';
    input.setAttribute('aria-label', (input.getAttribute('aria-label') ?? '').replace(/Round \d+/, `Round ${rowCount + 1}`));
  });
  const legend = row.querySelector('legend');
  if (legend !== null) legend.textContent = `Round ${rowCount + 1}`;
  rows.append(row);
  if (rowCount + 1 >= maxRows) addRound.disabled = true;
});

form.addEventListener('input', update);
update();
