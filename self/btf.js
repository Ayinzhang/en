(() => {
    // �ж��Ƿ�ΪӢ��
    const isIncludeEN = item => {
        const key = '/en/'
        return item.includes(key)
    }

    // ���� ���µ��򵽲�ͬ���Ե� url 
    window.loadFullPage = (url) => {
        window.location.href = url
    }

    // ���µ���
    const eventFn = (elements, includeEN) => {
        elements.forEach(item => {
            if (!includeEN || !isIncludeEN(item.href)) {
                item.href = `javascript:loadFullPage('${item.href}');`
            }
        })
    }

    // �ж�Ŀǰ�Ƿ�ΪӢ��
    const nowIncludeEN = isIncludeEN(window.location.href)

    // �޸���� url
    const selector = nowIncludeEN
        ? document.querySelectorAll('a[href^="https://ayinzhang.github.io"]')
        : document.querySelectorAll('a[href^="/en/"]')

    eventFn(selector, nowIncludeEN)
})()