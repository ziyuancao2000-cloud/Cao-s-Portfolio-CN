import { memo, useState } from 'react';

const EMAIL_ADDRESS = 'ziyuancao2000@gmail.com';
const gmailComposeUrl = (subject = '', body = '') =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_ADDRESS)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

function ContactPage() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = `作品集网站联系 — ${name}`;
    const body = `你好，Ziyuan：\n\n${message}\n\n—\n姓名：${name}\n邮箱：${email}`;

    setStatus('ready');
    window.open(gmailComposeUrl(subject, body), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="contact-page" id="contact" aria-labelledby="contact-title">
      <div className="contact-page__intro">
        <div>
          <h1 id="contact-title">
            <span className="contact-page__title-zh">联系我</span>
            <span className="contact-page__title-en" lang="en">Get in Touch</span>
          </h1>
        </div>

        <a className="contact-page__email" href={gmailComposeUrl()} target="_blank" rel="noreferrer">
          <span>直接发送邮件</span>
          <strong>{EMAIL_ADDRESS}</strong>
        </a>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form__row">
          <label className="contact-form__question">
            <span>你的姓名</span>
            <input name="name" type="text" autoComplete="name" placeholder="姓名" required />
          </label>
          <label className="contact-form__question">
            <span>你的邮箱</span>
            <input name="email" type="email" autoComplete="email" placeholder="邮箱地址" required />
          </label>
        </div>

        <label className="contact-form__question contact-form__question--message">
          <span>想聊些什么？</span>
          <textarea name="message" placeholder="可以分享项目、合作机会或你的想法……" rows="4" required />
        </label>

        <div className="contact-form__submit-row">
          <p>{status === 'ready' ? 'Gmail 草稿已准备好。' : '将在 Gmail 中打开已准备好的邮件。'}</p>
          <button type="submit">
            发送邮件
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg>
          </button>
        </div>
      </form>
    </section>
  );
}

export default memo(ContactPage);

