document.addEventListener("DOMContentLoaded", function () {
    const { defaultEncoding, translateDelay, msgToSimplifiedChinese } =
        GLOBAL_CONFIG.translate;
    const msgToEnglish = "EN";
    const snackbarData = GLOBAL_CONFIG.Snackbar;
    let currentEncoding = defaultEncoding;
    const targetEncodingCookie = "translate-en-chn";
    let targetEncoding =
        saveToLocal.get(targetEncodingCookie) === undefined
            ? defaultEncoding
            : Number(saveToLocal.get("translate-en-chn"));
    let translateButtonObject;
    const isSnackbar = snackbarData !== undefined;

    const isIncludeEN = (item) => {
        const key = "/en/";
        return item.includes(key);
    };

    const nowIncludeEN = isIncludeEN(window.location.href);
    console.log(nowIncludeEN);

    function translatePage() {
        let currentUrl = window.location.href;
        if (nowIncludeEN) {
            // Ӣ�� => ���ļ���
            translateButtonObject.textContent = msgToSimplifiedChinese;
            // ��ַ�� /en/... => /...
            let newUrl = currentUrl.replace("/en/", "/");
            console.log(`Redirect to ${newUrl}`);
            window.location.href = newUrl;
        } else {
            // ���ļ��� => Ӣ��
            translateButtonObject.textContent = msgToEnglish;
            // ��ַ /... => /en/...
            let newUrl = currentUrl.replace(/^(https?:\/\/[^\/]+)(\/)?/, "$1/en/");
            console.log(`Redirect to ${newUrl}`);
            window.location.href = newUrl;
        }
    }

    function translateInitialization() {
        translateButtonObject = document.getElementById("translateLink");
        if (translateButtonObject) {
            if (nowIncludeEN) {
                translateButtonObject.textContent = msgToSimplifiedChinese;
            } else {
                translateButtonObject.textContent = msgToEnglish;
            }
            translateButtonObject.addEventListener('click', translatePage, false)
        }
    }
    document.addEventListener("pjax:complete", translateInitialization);
    translateInitialization();
});