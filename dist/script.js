(async () => {
  let found = false;
  async function generateResponseWithChatGPT3({ message, mailFrom }) {
    // set up API parameters
    const apiUrl =
      "https://api.openai.com/v1/engines/text-davinci-003/completions";
    const prompt = `
    // important
    Reply to previous email from ${mailFrom} with a long and polite email,
    which says:  \n\n 

    // end of important

    // refrence
    This is the previous email for context and refrence:
    ${message}
    // end of refrence
    `;
    const maxTokens = 1024;
    const apiKey = "Your-openai-api-key";

    // send API request
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: maxTokens,
      }),
    });
    const data = await response.json();
    console.log(data.choices[0].text);
    return data.choices[0].text;
  }

  function createBtn(event) {
    const parent = event.relatedNode;
    const kyoBtn = document.createElement("div");
    const guup = document.createElement("div");
    guup.classList.add("gU", "Up");
    guup.style.marginLeft = "0.3rem";
    guup.style.cursor = "pointer";
    kyoBtn.innerHTML = "KYO";
    kyoBtn.classList.add("kyoBtn");
    kyoBtn.style.cssText = `
        display: inline-flex;
        position: relative;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        padding : .2rem;
        border: none;
        color: white;
        text-align: center;
        font-size: 16px;
        z-index: 999;
        background-color: #e40042;
        cursor: pointer !important;
    `;
    guup.appendChild(kyoBtn);
    parent.insertBefore(guup, parent.childNodes[1]);
    kyoBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let mailFrom = [],
        mailBody = [],
        mailInput = [];

      while (!mailFrom.length || !mailBody.length || !mailInput.length) {
        mailFrom = document.getElementsByClassName("gD");
        mailBody = document.getElementsByClassName("gs");
        mailInput = document.getElementsByClassName("aO7");
      }
      const context = mailInput[0].childNodes[0].innerText;
      mailInput[0].childNodes[0].innerText = "KYO Conseil is thinking...";
      console.log({ mailBody });
      const reply = generateResponseWithChatGPT3({
        message: mailBody[0].childNodes[2].innerText,
        mailFrom: mailFrom[0].innerText,
        context,
      });
      reply.then((reply) => {
        mailInput[0].childNodes[0].innerText = reply;
      });
    });
  }

  function addKyoBtnToDOM(event) {
    if (event.relatedNode.classList.contains("btC")) {
      if (!document.getElementsByClassName("kyoBtn")[0]) {
        createBtn(event);
      }
    }
  }
  // Select the element you want to observe

  let BTC;
  // Create a new MutationObserver instance
  const observer = new MutationObserver((mutations) => {
    BTC = document.getElementsByClassName("btC");
    if (BTC.length > 0) {
      addKyoBtnToDOM({ relatedNode: BTC[0] });
      observer.disconnect();
    }
  });

  // Configure the observer to watch for changes to the DOM subtree
  const observerConfig = { childList: true, subtree: true };

  // Start observing changes to the DOM
  observer.observe(document.body, observerConfig);
})();
