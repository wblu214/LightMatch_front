export default async (req, res) => {
    // 1. 获取真实后端地址（Vercel 设置的环境变量）
    const backendUrl = process.env.REAL_URL;

    // 3. 转发请求
    const response = await fetch(backendUrl, {
        method: req.method,
        headers: { 'Content-Type': 'application/json' },
        body: req.body ? JSON.stringify(req.body) : undefined
    });

    // 4. 返回结果给前端
    const data = await response.json();
    res.status(response.status).json(data);
};