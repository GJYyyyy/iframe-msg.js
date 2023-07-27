## How to use
**Only useful on the web side**

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>iframe通信</title>
    </head>

    <body>
        <iframe id="child" src="./child.html" frameborder="0"></iframe>

        <script src="./src/IframeMsg.js"></script>
        <script>
            let child = document.getElementById('child');

            child.onload = function () {
                let iframeMsg = new IframeMsg(child.contentWindow);

                // send msg
                iframeMsg.send('jump', '这条信息从父window发送到子window');

                // receive msg
                iframeMsg.addEventListener('message', (ev) => {
                    console.log(ev.target.data);
                    alert(JSON.stringify(ev.target.data));
                });
            };
        </script>
    </body>
</html>

```