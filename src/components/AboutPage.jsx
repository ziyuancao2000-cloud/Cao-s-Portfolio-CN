import { memo } from 'react';

function AboutPage() {
  return (
    <section className="about-page" id="about" aria-labelledby="about-title">
      <div className="about-page__identity">
        <h1 id="about-title">
          <span className="about-page__title-zh">关于</span>
          <span className="about-page__title-en" lang="en">About</span>
        </h1>
        <div className="about-page__footer">
          <div className="about-page__links" aria-label="专业链接">
            <a href="https://www.linkedin.com/in/ziyuan-cao" target="_blank" rel="noreferrer">
              LinkedIn
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12L12 4M6 4h6v6" /></svg>
            </a>
            <a href="/resume-cn.pdf" target="_blank" rel="noreferrer">
              简历
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12L12 4M6 4h6v6" /></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="about-page__copy">
        <p className="about-page__lead">
          我关注景观如何在时间、使用与环境之间建立关系。对我而言，场地从来不是一张空白图纸，它已经包含地形、材料、植物、水文，以及长期累积的使用痕迹与记忆。设计的价值，往往来自对这些既有条件的重新理解与组织。
        </p>
        <p>
          早期的住宅景观经验让我始终关注人的尺度与真实使用。动线、视线、种植、铺装、水景与细部并非独立存在，而是在日常的移动、停留与感知中共同塑造空间。
        </p>
        <p>
          随着项目尺度不断扩展，我的工作也逐渐从空间体验延伸到生态系统、场地过程与更复杂的城市关系。我关注设计如何回应环境变化，同时保留场所自身的特征，并在自然、城市与人的生活之间建立新的联系。
        </p>
        <p>
          我也在持续探索 AI 在设计流程中的角色，从视觉增强延伸到概念探索、氛围测试与方案比较。它为设计提供更快速的试验方式，但设计判断仍然建立在对场地、空间与使用者的理解之上。
        </p>
      </div>
    </section>
  );
}

export default memo(AboutPage);

