<template>
  <footer :class="{ 'main-expanded': !isSidebarOpen }">
    <div class="footer-container">
      <div class="footer-container-up">
        <div class="footer-brand">
          <img
            src="/img/Logo/logo.png"
            alt="Логотип салона"
            class="footer-logo"
          />
          <p class="footer-description">
            «Beauty Salon» — место, где начинается ваша красота. Мы создаём
            стиль, уверенность и вдохновение.
          </p>
        </div>
        <div class="footer-contact">
          <h3>Контакты</h3>
          <ul>
            <li>📍 Адрес: ул. Большая Якиманка, 26, Москва</li>
            <li>
              📞 Телефон: <a href="tel:+74951234567">+7 (917) 814-98-41</a>
            </li>
            <li>
              📧 Email:
              <a href="mailto:bellezza@beautysalon.ru"
                >bellezza@beautysalon.ru</a
              >
            </li>
            <li>🕒 Часы работы: Пн–Сб 10:00–20:00</li>
          </ul>
        </div>

        <div class="social_network">
          <h3>Мы в соцсетях</h3>
          <div class="social_network_wrapper">
            <a href="https://instagram.com/suiunalievich29" target="_blank"
              ><i class="fab fa-instagram"></i
            ></a>
            <a href="https://m.vk.com/moon_are" target="_blank"
              ><i class="fab fa-vk"></i
            ></a>
            <a href="https://facebook.com/moon_are" target="_blank"
              ><i class="fab fa-facebook"></i
            ></a>
          </div>
        </div>
        <div class="footer-subscribe">
          <h3>Подписка на рассылку</h3>
          <form action="#">
            <input type="email" placeholder="Введите ваш email" required />
            <button type="submit">Подписаться</button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 BELLEZA. Все права защищены.</p>
        <a href="/privacy-policy">Политика конфиденциальности</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps(["isSidebarOpen"]);
</script>

<style lang="scss" scoped>
footer {
  height: auto;
  margin-top: 40px;
  background-color: var(--footer-bg-color);
  color: #fff;
  font-family: "Arial", sans-serif;
  display: flex;
  padding: 30px;
  align-items: center;
  justify-content: center;
  transition: margin-left 0.3s ease;
  margin-left: 100px;

  .footer-container {
    display: flex;
    flex-direction: column;

    &-up {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 20px;

      .footer-brand {
        max-width: 300px;

        .footer-logo {
          width: 100px;
          margin-bottom: 15px;
        }

        .footer-description {
          font-size: 14px;
          line-height: 1.6;
        }
      }

      .footer-contact,
      .social_network,
      .footer-subscribe {
        flex: 1;
        min-width: 200px;

        h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }

        ul {
          list-style: none;
          padding: 0;

          li {
            margin-bottom: 8px;
            font-size: 14px;

            a {
              color: #fff;
              text-decoration: none;

              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }

      .social_network {
        &_wrapper {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;

          a {
            font-size: 30px;
            color: #fff;

            &:hover {
              color: #e91e63;
            }
          }
        }
      }

      .footer-subscribe {
        form {
          display: flex;
          gap: 10px;

          input {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 4px;
          }

          button {
            padding: 10px 15px;
            background-color: #e91e63;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;

            &:hover {
              background-color: #d81b60;
            }
          }
        }
      }
    }

    .footer-bottom {
      margin-top: 20px;
      border-top: 1px solid #444;
      padding-top: 10px;
      text-align: center;
      font-size: 12px;

      a {
        color: #fff;
        text-decoration: none;
        margin-left: 10px;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  @media (max-width: 768px) {
    margin-left: 0;

    .footer-container {
      padding: 15px;
    }

    .footer-container-up {
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }

    .footer-brand {
      text-align: center;
      max-width: 100%;
    }

    .footer-contact,
    .social_network,
    .footer-subscribe {
      min-width: 100%;
      text-align: center;

      h3 {
        font-size: 16px;
      }

      ul li {
        font-size: 12px;
      }
    }

    .social_network_wrapper {
      justify-content: center;
      gap: 15px;
    }

    .footer-subscribe form {
      flex-direction: column;
      gap: 15px;
    }

    .footer-bottom {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    .footer-logo {
      width: 80px;
    }

    .footer-description {
      font-size: 12px;
    }

    .footer-contact ul li {
      font-size: 12px;
    }

    .social_network_wrapper a {
      font-size: 25px;
    }

    .footer-subscribe input,
    .footer-subscribe button {
      font-size: 14px;
      padding: 8px;
    }
  }
}
</style>
