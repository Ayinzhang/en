document.addEventListener("DOMContentLoaded", function () {
    const msgToEnglish = "EN";
    const msgToChinese = "ZH";

    const isOnEnglishSite = () => window.location.href.includes("/en/");

    const setTranslateButtonText = () => {
        const btn = document.getElementById("translateLink");
        if (btn) btn.textContent = isOnEnglishSite() ? msgToChinese : msgToEnglish;
    };

    const switchLang = () => {
        const currentUrl = window.location.href;
        if (isOnEnglishSite()) {
            // /en/... => /...
            window.location.href = currentUrl.replace("/en/", "/");
        } else {
            // /... => /en/...
            window.location.href = currentUrl.replace(/^(https?:\/\/[^\/]+)(\/)?/, "$1/en/");
        }
    };

    // Butterfly v5.x delegates #translateLink clicks via #rightside to
    // window.translateFn.translatePage(). Override that function so the
    // delegated handler triggers our cross-site redirect instead of tw_cn's
    // simplified/traditional conversion.
    const overrideAndLabel = () => {
        window.translateFn = window.translateFn || {};
        window.translateFn.translatePage = switchLang;
        setTranslateButtonText();
    };

    overrideAndLabel();
    document.addEventListener("pjax:complete", overrideAndLabel);
});
