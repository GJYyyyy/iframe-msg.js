## Install

```bash
npm i iframe-msg.js
```

## How to use

**Only useful on the web side**

```html
<!-- Parent.vue -->
<script setup>
  import { ref, onMounted } from "vue";
  import IframeMsg from "iframe-msg.js"; // 引入IframeMsg.js

  const myIframe = ref();

  onMounted(() => {
    let $iframe = myIframe.value;
    $iframe.onload = function () {
      const iframeMsg = new IframeMsg($iframe.contentWindow);

      // 向iframe发送消息
      iframeMsg.send("parent say", "hello iframe");

      // 接收iframe发来的消息
      iframeMsg.addEventListener("message", function (e) {
        console.log(e.target.data);
      });
    };
  });
</script>

<template>
  <iframe ref="myIframe" src="/children.html" frameborder="0"></iframe>
</template>
```

```html
<!-- children.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script>
      // 接收父页面发来的消息
      window.addEventListener(
        "message",
        (ev) => {
          if (ev.data) {
            const { action, data } = ev.data;
            if (action === undefined) return;
            this.data = ev.data;
            console.log(ev.data);
          }
        },
        false
      );

      // 向父页面发送消息
      setTimeout(() => {
        window.parent.postMessage(
          { action: "iframe say", data: "hello parent" },
          "*"
        );
      }, 1000);
    </script>
  </body>
</html>
```
