front.send("get_last_10_articles", articles => {
    const articlesBlock = document.getElementById("news");

    for (const article of articles) {
        const articleBlock = document.createElement("div");
        articleBlock.className = "article-block";

        const authorText = article.author.real_full_name;
        const titleText = article.header;
        const textText = article.text;
        const videoText = article.video;
        const imageText = article.image;

        const authorBlock = document.createElement("div");
        authorBlock.innerHTML = authorText;
        authorBlock.className = "article-author";

        const titleBlock = document.createElement("h1");
        titleBlock.innerHTML = titleText;
        titleBlock.className = "semester-marker";
        
        const textBlock = document.createElement("div");
        textBlock.innerHTML = textText;
        textBlock.className = "article-text";

        let videoBlock;
        let imageBlock;

        if (videoText) {
            videoBlock = document.createElement("iframe");
            videoBlock.src = videoText;
            videoBlock.className = "article-video";
        }

        if (imageText) {
            imageBlock = document.createElement("img");
            imageBlock.src = imageText;
            imageBlock.className = "article-image";
        }

        const articleBlockMain = document.createElement("div");
        articleBlockMain.className = "article-block-main";
        articleBlockMain.appendChild(textBlock);

        const articleBlockMedia = document.createElement("div");
        articleBlockMedia.className = "article-block-media";

        if (imageText) articleBlockMedia.appendChild(imageBlock);
        if (videoText) articleBlockMedia.appendChild(videoBlock);

        articleBlockMain.appendChild(articleBlockMedia);

        articleBlock.appendChild(titleBlock);

        articleBlock.appendChild(articleBlockMain);
        articleBlock.appendChild(authorBlock);

        articlesBlock.appendChild(articleBlock);
    }
});