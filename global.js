var __global__ = {
    data: {
        URL: 'http://localhost:8000/',
        case: null,
    },
    method: {
        getUrl: (params) => {
            let ret = __global__.data.URL;
            for (let i = 0; i < params.length; i++) {
                ret += params[i];
                if (params[i][0] !== '?') ret += '/';
            }
            return ret;
        },
        setCase: (c) => {
            __global__.data.case = c;
        }
    }
};