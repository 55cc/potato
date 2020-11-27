(ctx)=>({
        "port": 3000,
        "dev": "dev",
        "timeout": 800,
        "cli": {
            "linux": "xdg-open",
            "windows": "start",
            "mac": "xdg-open"
        }[ctx.os],
        "imports": {
            "@root/": `${ctx.cwd}/`, // serve 的根路径
        },
        "copy":["index.html", "global.css", "favicon.png"],
        "app":"app.svelte",
        "page":"page",
        "dist":"dist"
})