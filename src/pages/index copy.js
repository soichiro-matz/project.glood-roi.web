export default function Home() {
  return (
    <ul class="nav">
      <li class="parent">
        <a href="/">
          <p class="title_en">Home</p>
          <p class="title">ホーム</p>
        </a>
        <div class="child">
          <ul>
            <li>
              <a href="#">first</a>
            </li>
            <li>
              <a href="#">second</a>
            </li>
            <li>
              <a href="#">third</a>
            </li>
          </ul>
        </div>
      </li>
      <li class="parent">
        <a href="about">
          <p class="title_en">About</p>
          <p class="title">企業情報</p>
        </a>
        <div class="child">
          <ul>
            <li>
              <a href="#">vvm</a>
            </li>
            <li>
              <a href="#">outline</a>
            </li>
          </ul>
        </div>
      </li>
      <li class="parent">
        <a href="service">
          <p class="title_en">Service</p>
          <p class="title">サービス</p>
        </a>
      </li>
    </ul>
  );
}
