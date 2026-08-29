(function () {
    const valueEl = document.querySelector('#calc-value');
    const exprEl = document.querySelector('#calc-expression');

    if (!valueEl || !exprEl) return;

    let current = '0';
    let previous = null;
    let operator = null;
    let waitingForOperand = false;
    let justEvaluated = false;
    let expr = '';
    let angleMode = 'deg';

    const MAX_LEN = 16;

    function symbol(op) {
        switch (op) {
            case '+': return '+';
            case '-': return '−';
            case '*': return '×';
            case '/': return '÷';
            case '^': return '^';
            default: return '';
        }
    }

    function toNumber(value) {
        const n = parseFloat(String(value).replace(',', '.'));
        return Number.isFinite(n) ? n : 0;
    }

    function formatNumber(num) {
        if (num === null || num === undefined) return '';
        if (!Number.isFinite(num)) return 'Erro';

        let n = Number(Number(num).toPrecision(12));

        if (n === 0) return '0';

        const abs = Math.abs(n);

        if (abs >= 1e15 || abs < 1e-9) {
            return n.toExponential(6).replace('.', ',');
        }

        return String(n).replace('.', ',');
    }

    function syncAngleButton() {
        const btn = document.querySelector('[data-action="angle-mode"]');
        if (!btn) return;

        btn.textContent = angleMode.toUpperCase();
        btn.setAttribute(
            'aria-label',
            angleMode === 'deg'
                ? 'Modo graus. Clique para alternar para radianos.'
                : 'Modo radianos. Clique para alternar para graus.'
        );
    }

    function update() {
        valueEl.textContent = current === 'Error' ? 'Erro' : current;
        exprEl.textContent = expr;

        const len = String(current).length;
        valueEl.classList.toggle('calc-value--sm', len > 12 && len <= 18);
        valueEl.classList.toggle('calc-value--xs', len > 18);

        syncAngleButton();
    }

    function allClear() {
        current = '0';
        previous = null;
        operator = null;
        waitingForOperand = false;
        justEvaluated = false;
        expr = '';
        update();
    }

    function clearEntry() {
        if (current === 'Error') return allClear();

        current = '0';
        waitingForOperand = false;
        justEvaluated = false;

        if (!(previous !== null && operator)) {
            expr = '';
        }

        update();
    }

    function markEntryComplete() {
        if (previous !== null && operator) {
            waitingForOperand = true;
        } else {
            justEvaluated = true;
        }
    }

    function inputDigit(d) {
        if (current === 'Error') allClear();

        if (justEvaluated) {
            previous = null;
            operator = null;
            expr = '';
            justEvaluated = false;
            current = d;
            waitingForOperand = false;
        } else if (waitingForOperand) {
            current = d;
            waitingForOperand = false;
        } else {
            const digitsOnly = current.replace(/[^0-9]/g, '');

            if (digitsOnly.length >= MAX_LEN) return;

            if (current === '0') {
                current = d;
            } else if (current === '-0') {
                current = '-' + d;
            } else {
                current += d;
            }
        }

        update();
    }

    function inputDecimal() {
        if (current === 'Error') allClear();

        if (justEvaluated) {
            previous = null;
            operator = null;
            expr = '';
            justEvaluated = false;
            current = '0,';
            waitingForOperand = false;
        } else if (waitingForOperand) {
            current = '0,';
            waitingForOperand = false;
        } else if (!current.includes(',')) {
            current += ',';
        }

        update();
    }

    function perform(a, b, op) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/':
                if (b === 0) return NaN;
                return a / b;
            case '^':
                return Math.pow(a, b);
            default:
                return NaN;
        }
    }

    function setOperator(nextOp) {
        if (current === 'Error') return allClear();

        const value = toNumber(current);

        if (previous === null) {
            previous = value;
        } else if (operator && !waitingForOperand) {
            const result = perform(previous, value, operator);

            if (!Number.isFinite(result)) {
                current = 'Error';
                expr = '';
                update();
                return;
            }

            previous = Number(Number(result).toPrecision(12));
        } else if (operator && waitingForOperand) {
            operator = nextOp;
            expr = `${formatNumber(previous)} ${symbol(operator)}`;
            update();
            return;
        }

        operator = nextOp;
        waitingForOperand = true;
        justEvaluated = false;
        expr = `${formatNumber(previous)} ${symbol(operator)}`;

        update();
    }

    function equals() {
        if (current === 'Error') return;

        if (operator !== null && previous !== null) {
            const a = previous;
            const b = toNumber(current);
            const op = operator;

            const result = perform(a, b, op);

            if (!Number.isFinite(result)) {
                current = 'Error';
                expr = '';
                update();
                return;
            }

            const rounded = Number(Number(result).toPrecision(12));

            current = formatNumber(rounded);
            expr = `${formatNumber(a)} ${symbol(op)} ${formatNumber(b)} =`;

            previous = null;
            operator = null;
            waitingForOperand = false;
            justEvaluated = true;
        } else {
            justEvaluated = true;
        }

        update();
    }

    function percent() {
        if (current === 'Error') return;

        let value = toNumber(current);

        if (previous !== null && operator) {
            if (operator === '+' || operator === '-') {
                value = previous * (value / 100);
            } else {
                value = value / 100;
            }
        } else {
            value = value / 100;
        }

        current = formatNumber(Number(Number(value).toPrecision(12)));
        update();
    }

    function backspace() {
        if (current === 'Error') return allClear();

        if (justEvaluated) {
            current = '0';
            justEvaluated = false;
            waitingForOperand = false;
            expr = '';
            update();
            return;
        }

        if (waitingForOperand) {
            current = '0';
            waitingForOperand = false;
            expr = previous !== null && operator ? `${formatNumber(previous)} ${symbol(operator)}` : '';
            update();
            return;
        }

        if (current.length <= 1 || (current.length === 2 && current.startsWith('-'))) {
            current = '0';
        } else {
            current = current.slice(0, -1);
        }

        if (current === '-') current = '0';

        justEvaluated = false;
        update();
    }

    function toggleSign() {
        if (current === 'Error') return;

        const value = toNumber(current);
        if (value === 0) return;

        if (current.startsWith('-')) {
            current = current.slice(1);
        } else {
            current = '-' + current;
        }

        markEntryComplete();
        update();
    }

    function trig(fn, value) {
        const rad = angleMode === 'deg' ? value * Math.PI / 180 : value;
        return fn(rad);
    }

    function factorial(n) {
        if (!Number.isInteger(n) || n < 0 || n > 170) return NaN;

        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }

        return result;
    }

    function applyFunction(fn) {
        if (current === 'Error') return allClear();

        const hasPendingOp = previous !== null && operator;

        if (fn === 'pi') {
            current = formatNumber(Math.PI);
            if (!hasPendingOp) expr = '';
            markEntryComplete();
            update();
            return;
        }

        if (fn === 'e') {
            current = formatNumber(Math.E);
            if (!hasPendingOp) expr = '';
            markEntryComplete();
            update();
            return;
        }

        const value = toNumber(current);
        let result;

        switch (fn) {
            case 'sin':
                result = trig(Math.sin, value);
                break;

            case 'cos':
                result = trig(Math.cos, value);
                break;

            case 'tan':
                result = trig(Math.tan, value);
                break;

            case 'ln':
                if (value <= 0) return setError();
                result = Math.log(value);
                break;

            case 'log':
                if (value <= 0) return setError();
                result = Math.log10(value);
                break;

            case 'sqrt':
                if (value < 0) return setError();
                result = Math.sqrt(value);
                break;

            case 'square':
                result = value * value;
                break;

            case 'fact':
                result = factorial(value);
                break;

            default:
                return;
        }

        if (!Number.isFinite(result)) {
            return setError();
        }

        current = formatNumber(Number(Number(result).toPrecision(12)));

        if (!hasPendingOp) expr = '';

        markEntryComplete();
        update();
    }

    function setError() {
        current = 'Error';
        previous = null;
        operator = null;
        waitingForOperand = false;
        justEvaluated = true;
        expr = '';
        update();
    }

    function toggleAngleMode() {
        angleMode = angleMode === 'deg' ? 'rad' : 'deg';
        syncAngleButton();
    }

    function handleKey(event) {
        const key = event.key;
        const target = event.target;

        if (event.ctrlKey || event.metaKey || event.altKey) return;

        if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

        const isButton = target && (target.tagName === 'BUTTON' || target.isContentEditable);
        if (isButton && (key === 'Enter' || key === ' ')) return;

        switch (key) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                inputDigit(key);
                event.preventDefault();
                break;

            case '.':
            case ',':
                inputDecimal();
                event.preventDefault();
                break;

            case '+':
                setOperator('+');
                event.preventDefault();
                break;

            case '-':
                setOperator('-');
                event.preventDefault();
                break;

            case '*':
            case 'x':
            case 'X':
                setOperator('*');
                event.preventDefault();
                break;

            case '/':
                event.preventDefault();
                setOperator('/');
                break;

            case '^':
                setOperator('^');
                event.preventDefault();
                break;

            case '%':
                percent();
                event.preventDefault();
                break;

            case '=':
            case 'Enter':
                equals();
                event.preventDefault();
                break;

            case 'Backspace':
                backspace();
                event.preventDefault();
                break;

            case 'Escape':
                allClear();
                event.preventDefault();
                break;

            case 'Delete':
                clearEntry();
                event.preventDefault();
                break;

            default:
                break;
        }
    }

    document.addEventListener('click', function (event) {
        const btn = event.target.closest('.calc-btn');
        if (!btn) return;

        const action = btn.dataset.action;

        if (action === 'clear-all') allClear();
        else if (action === 'backspace') backspace();
        else if (action === 'percent') percent();
        else if (action === 'toggle-sign') toggleSign();
        else if (action === 'equals') equals();
        else if (action === 'decimal') inputDecimal();
        else if (action === 'angle-mode') toggleAngleMode();
        else if (btn.dataset.fn !== undefined) applyFunction(btn.dataset.fn);
        else if (btn.dataset.digit !== undefined) inputDigit(btn.dataset.digit);
        else if (btn.dataset.op !== undefined) setOperator(btn.dataset.op);

        // Remove o foco após clique/toque para facilitar o uso do teclado físico depois.
        if (event.detail > 0) btn.blur();
    });

    window.addEventListener('keydown', handleKey);

    syncAngleButton();
    update();
})();
