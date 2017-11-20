var __global__ = {
    data: {
        URL: 'http://172.16.101.125:8000/',
        caseHash: ''
    },
    method: {
        getUrl: (params) => {
            let ret = __global__.data.URL;
            for (let i = 0; i < params.length; i++) {
                ret += params[i];
                if (params[i][0] !== '?') ret += '/';
            }
            return ret;
        }
    }
};