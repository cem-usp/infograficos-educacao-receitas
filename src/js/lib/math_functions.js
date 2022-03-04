// sort array ascending
const asc = arr => arr.sort((a, b) => a - b);

const sum = arr => arr.reduce((a, b) => a + b, 0);

const mean = arr => sum(arr) / arr.length;

// sample standard deviation
const std = (arr) => {
    const mu = mean(arr);
    const diffArr = arr.map(a => (a - mu) ** 2);
    return Math.sqrt(sum(diffArr) / (arr.length - 1));
};

const quantile = (arr, q) => {
    const sorted = asc(arr);
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
        return sorted[base];
    }
};

const q25 = arr => quantile(arr, .25);

const q50 = arr => quantile(arr, .50);

const q75 = arr => quantile(arr, .75);

const median = arr => q50(arr);

var arr_sample = [-0.07115550, -0.33863821, -0.22333462, -0.10103213, -0.37700648,
     -0.24664460, -0.09212169, -0.18688973, -0.14943306, -0.39223729, -0.15585836,
      -0.27668644, -0.24229453, -0.23208504, -0.39238232, -0.21077830, -0.33559380,
       -0.33168546, -0.39537042, -0.34312491, -0.33969808, -0.27440869, -0.04875820,
        -0.21013998, -0.25281140, -0.30719326, -0.28820604]
