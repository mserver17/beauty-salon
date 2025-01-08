<template>
  <section class="advantages">
    <section class="promo">
      <h2>Специальное предложение</h2>
      <p>
        Станьте нашим клиентом уже сегодня и получите
        <strong>10% скидку</strong> на первое посещение!
      </p>
      <router-link to="/booking" class="promo-button">Записаться</router-link>
    </section>
    <section class="why_we_are">
      <ul>
        <h2>Почему выбирают нас?</h2>

        <li>
          <span class="material-symbols-outlined">verified</span>
          Сертифицированные мастера с многолетним опытом
        </li>
        <li>
          <span class="material-symbols-outlined">spa</span>
          Используем только проверенную косметику премиум-класса
        </li>
        <li>
          <span class="material-symbols-outlined">schedule</span>
          Удобное онлайн-бронирование в любое время
        </li>
      </ul>
      <div class="why_we_are_img-block">
        <img src="/img/undraw_makeup-artist_0xtr.svg" alt="Makeup Artist" />
      </div>
    </section>
  </section>
</template>
<script setup></script>
<style lang="scss" scoped>
.advantages {
  max-width: 1000px;
  margin: 40px auto;
  text-align: center;
  padding: 20px;
  background: var(--section-bg-color);
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  .promo {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 50px;
    p {
      font-size: 1.2rem;
      color: var(--font-color);
      margin-bottom: 20px;
    }
    &-button {
      display: inline-block;
      padding: 10px 20px;
      background-color: var(--button-bg-color);
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;

      :hover {
        background-color: var(--button-hover-color);
      }
    }
  }
  .why_we_are {
    display: flex;
    padding: 40px;

    ul {
      flex: 1;
      list-style: none;
      padding: 0;

      h2 {
        font-size: 1.6rem;
        color: var(--font-color);
        margin-bottom: 20px;
      }

      li {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        font-size: 1.1rem;

        span {
          font-size: 1.5rem;
          color: var(--button-bg-color);
        }
      }
    }
    &_img-block {
      flex: 1;

      img {
        width: 500px;
        height: auto;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .advantages {
    padding: 10px;

    .why_we_are {
      display: flex;
      flex-direction: column;
      padding: 15px;
      &_img-block {
        img {
          width: 300px;
        }
      }
    }
  }
}
</style>
