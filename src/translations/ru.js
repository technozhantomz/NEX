export const ru = {
  transaction: {
    feeTypes: {
      _none: "Бесплатно",
      basic_fee: "Базовая плата",
      distribution_base_fee: "Базовая плата за распространение",
      distribution_fee_per_holder: "Распределительная цена на держателя",
      fee: "Регулярная комиссия за транзакцию",
      fee_per_day: "Цена в день",
      fee_per_kb: "Цена за килобайт Размер транзакции",
      long_symbol: "Более длинные символы",
      lottery_asset: "Лотерейный актив",
      membership_annual_fee: "Годовое членство",
      membership_lifetime_fee: "Пожизненное членство",
      premium_fee: "Плата за премиальные имена",
      price_per_kbyte: "Цена за килобайт Размер транзакции",
      price_per_output: "Цена за получателя",
      symbol3: "Символы с 3 символами",
      symbol4: "Символы с 4 символами",
    },
    trxTypes: {
      account_create: {
        title: "Зарегистрироваться",
        description:
          "%(registrarName)s, зарегистрировал аккаунт , %(userName)s",
      },
      account_role_create: {
        title: "Создать роль учетной записи",
      },
      account_role_delete: {
        title: "Удалить роль учетной записи",
      },
      account_role_update: {
        title: "Обновить роль учетной записи",
      },
      account_transfer: {
        title: "Перенести аккаунт",
      },
      account_update: {
        title: "Обновить аккаунт",
        description: "%(user)s, обновленные данные аккаунта",
      },
      account_upgrade: {
        title: "Обновить аккаунт",
        description: "%(user)s, повышена учетная запись до пожизненного члена",
      },
      account_whitelist: {
        title: "Белый список аккаунта",
        description: "%(issuer)s, %(status)s счет, %(listed)s",
      },
      all: {
        title: "Показать все",
      },
      assert: {
        title: "Подтвердить операцию",
      },
      asset_bid_collateral: {
        title: "Обеспечение заявки",
      },
      asset_claim_fee_pool: {
        title: "Баланс пула сборов за претензию",
      },
      asset_claim_fees: {
        title: "Плата за активы",
      },
      asset_claim_pool: {
        title: "Плата за активы претензии",
        description:
          "%(issuer)s, утверждал %(claimed)s %(claimedSymbol)s из %(asset)s комиссионный фонд",
      },
      asset_create: {
        title: "Создать объект",
        description: "%(issuer)s, создал актив %(symbol)s",
      },
      asset_dividend_distribution: {
        title: "Распределение дивидендов по активам",
      },
      asset_fund_fee_pool: {
        title: "Пул комиссий за активы фонда",
        description:
          "%(from)s, финансируемый %(symbol)s комиссионный пул с %(amount)s %(defaultToken)s",
      },
      asset_global_settle: {
        title: "Глобальный расчет активов",
      },
      asset_issue: {
        title: "Выпустить актив",
        description:
          "%(issuer)s, изданный %(assetAmount)s %(symbol) к, %(receiver)s",
      },
      asset_publish_feed: {
        title: "Опубликовать фид",
      },
      asset_reserve: {
        title: "Сжечь актив",
      },
      asset_settle: {
        title: "Расчет активов",
      },
      asset_settle_cancel: {
        title: "Отменить расчет активов",
      },
      asset_update: {
        title: "Обновить объект",
        description: "%(issuer)s, обновленный актив %(symbol)s",
      },
      asset_update_bitasset: {
        title: "Обновить СмартКоин",
      },
      asset_update_dividend: {
        title: "Обновление дивидендов по активам",
      },
      asset_update_feed_producers: {
        title: "Обновить производителей каналов объектов",
        description:
          "%(issuer)s, обновлены производители фидов для актива %(asset)s",
      },
      asset_update_issuer: {
        title: "Обновить владельца объекта",
        description: "%(issuer)s, переданы права на %(asset)s к, %(newOwner)s",
      },
      balance_claim: {
        title: "Требовать остаток",
      },
      bet_adjusted: {
        title: "Скорректированная ставка",
      },
      bet_cancel: {
        title: "Отменить ставку",
      },
      bet_canceled: {
        title: "Отмененная ставка",
      },
      betting_market_create: {
        title: "Создать рынок ставок",
      },
      betting_market_group_cancel: {
        title: "Отменить группу рынка ставок",
      },
      betting_market_group_create: {
        title: "Создать группу рынка ставок",
      },
      betting_market_group_resolve: {
        title: "Группа рынка ставок Resolve",
      },
      betting_market_group_resolved: {
        title: "Решенная группа рынка ставок",
      },
      betting_market_group_update: {
        title: "Обновить группу рынка ставок",
      },
      betting_market_rules_create: {
        title: "Создайте правила рынка ставок",
      },
      betting_market_rules_update: {
        title: "Обновите правила рынка ставок",
      },
      betting_market_update: {
        title: "Обновить букмекерскую контору",
      },
      bet_matched: {
        title: "Соответствующая ставка",
      },
      bet_place: {
        title: "Сделать ставку",
      },
      bid: {
        title: "Делать ставку",
      },
      bid_collateral: {
        title: "Залоговая ставка",
      },
      blind_transfer: {
        title: "Слепой перевод",
      },
      call_order_update: {
        title: "Обновить поля",
      },
      committee_member_create: {
        title: "Создать члена комитета",
      },
      committee_member_update: {
        title: "Член комитета по обновлению",
      },
      committee_member_update_global_parameters: {
        title: "Обновление глобальных параметров",
      },
      custom: {
        title: "Обычай",
      },
      custom_account_authority_create: {
        title: "Создание настраиваемых полномочий учетной записи",
      },
      custom_account_authority_delete: {
        title: "Удалить полномочия пользовательской учетной записи",
      },
      custom_account_authority_update: {
        title: "Обновить полномочия пользовательской учетной записи",
      },
      custom_permission_create: {
        title: "Создать собственное разрешение",
      },
      custom_permission_delete: {
        title: "Удалить специальное разрешение",
      },
      custom_permission_update: {
        title: "Обновить пользовательское разрешение",
      },
      event_create: {
        title: "Создать событие",
      },
      event_group_create: {
        title: "Создать группу событий",
      },
      event_group_delete: {
        title: "Удалить группу событий",
      },
      event_group_update: {
        title: "Обновить группу событий",
      },
      event_update: {
        title: "Обновить событие",
      },
      event_update_status: {
        title: "Обновить статус события",
      },
      execute_bid: {
        title: "Выполнить ставку",
      },
      fba_distribute_operation: {
        title: "Платное распределение активов",
      },
      fill_order: {
        title: "Заполнить заказ",
        description:
          "%(user)s, купленный %(paysAmount)s за %(receivesAmmount)s за заказ #%(id)s",
      },
      game_move: {
        title: "Ход игры",
      },
      htlc_create: {
        title: "HTLC создать",
      },
      htlc_extend: {
        title: "HTLC расширить",
      },
      htlc_redeem: {
        title: "HTLC выкупить",
      },
      htlc_redeemed: {
        title: "HTLC погашен",
      },
      htlc_refund: {
        title: "Возврат HTLC",
      },
      limit_order_cancel: {
        title: "Отменить заказ",
        description: "%(user)s, отмененный заказ #%(id)s",
      },
      limit_order_create: {
        title: "Разместить заказ",
        description:
          "%(creator)s, размещенный заказ #%(orderId)s покупать %(buyAmount)s за %(sellAmount)s",
      },
      swap_order_create: {
        title: "своп ордер",
        description:
          "%(creator)s, размещенный своп-ордер #%(orderId)s поменяться %(buyAmount)s за %(sellAmount)s",
      },
      lottery_asset_create: {
        title: "Создать лотерейный актив",
      },
      lottery_end: {
        title: "Завершить лотерею",
      },
      lottery_reward: {
        title: "Наградная лотерея",
      },
      override_transfer: {
        title: "Переопределить передачу",
      },
      nft_approve: {
        title: "Одобрить NFT",
      },
      nft_metadata_create: {
        title: "Создать метаданные nft",
      },
      nft_metadata_update: {
        title: "Обновить метаданные nft",
      },
      nft_mint: {
        title: "Монетный двор нфт",
      },
      nft_safe_transfer_from: {
        title: "nft безопасный перевод из",
      },
      nft_set_approval_for_all: {
        title: "Установить одобрение для всех nft",
      },
      proposal_create: {
        title: "Создать предложение",
      },
      proposal_delete: {
        title: "Удалить предложение",
      },
      proposal_update: {
        title: "Обновить предложение",
      },
      ticket_create: {
        title: "Создать тикет",
      },
      sweeps_vesting_claim: {
        title: "Урегулирование претензий",
      },
      sidechain_address_add: {
        title: "Добавить адрес боковой цепи",
      },
      sidechain_address_delete: {
        title: "Удалить адрес боковой цепи",
      },
      sidechain_address_update: {
        title: "Обновить адрес боковой цепи",
      },
      sidechain_transaction_create: {
        title: "Создать сайдчейн транзакцию",
      },
      sidechain_transaction_send: {
        title: "Отправить сайдчейн транзакцию",
      },
      sidechain_transaction_settle: {
        title: "Совершить сайдчейн транзакцию",
      },
      sidechain_transaction_sign: {
        title: "Подписать сайдчейн транзакцию",
      },
      son_create: {
        title: "Создать SON",
      },
      son_delete: {
        title: "Удалить SON",
      },
      son_heartbeat: {
        title: "Стук сердца SON",
      },
      son_maintenance: {
        title: "SON техническое обслуживание",
      },
      son_report_down: {
        title: "Отчет SON вниз",
      },
      son_update: {
        title: "Обновлять SON",
      },
      son_wallet_recreate: {
        title: "Воссоздать SON бумажник",
      },
      son_wallet_update: {
        title: "Обновлять SON бумажник",
      },
      sport_create: {
        title: "Создать вид спорта",
      },
      sport_delete: {
        title: "Удалить вид спорта",
      },
      sport_update: {
        title: "Обновить вид спорта",
      },
      ticket_purchase: {
        title: "Купить билет",
      },
      tournament_create: {
        title: "Создать турнир",
      },
      tournament_join: {
        title: "Присоединиться к турниру",
      },
      tournament_payout: {
        title: "Выплатный турнир",
      },
      tournament_leave: {
        title: "Покинуть турнир",
      },
      transfer: {
        title: "Передача",
        description:
          "%(sender)s, Отправить %(amount)s %(symbol)s к , %(receiver)s",
      },
      transfer_from_blind: {
        title: "Перевод со слепого счета",
      },
      transfer_to_blind: {
        title: "Перевод на слепой счет",
      },
      vesting_balance_create: {
        title: "Создать вестинговый баланс",
        description: "%(creator)s, жилет %(amount)s %(symbol)s в GPOS",
      },
      vesting_balance_withdraw: {
        title: "Вывод вестингового баланса",
        description: "%(owner)s, отводить %(amount)s %(symbol)s От GPOS",
      },
      withdraw: {
        title: "Отзывать",
      },
      withdraw_permission_claim: {
        title: "Разрешение на снятие претензии",
      },
      withdraw_permission_create: {
        title: "Создать разрешение на снятие средств",
      },
      withdraw_permission_delete: {
        title: "Удалить разрешение на снятие средств",
      },
      withdraw_permission_update: {
        title: "Обновить разрешение на снятие средств",
      },
      witness_create: {
        title: "Создать свидетеля",
      },
      witness_update: {
        title: "Обновить свидетеля",
      },
      witness_withdraw_pay: {
        title: "Снятие оплаты со свидетелем",
      },
      worker_create: {
        title: "Создать работника",
        description:
          "%(user)s, создал рабочее предложение с ежедневной оплатой %(defaultToken)s",
      },
      credit_offer_create: {
        title: "Создать кредитное предложение",
      },
      credit_offer_delete: {
        title: "Удалить кредитное предложение",
      },
      credit_offer_update: {
        title: "Обновить кредитное предложение",
      },
      credit_offer_accept: {
        title: "Принять кредитное предложение",
      },
      credit_deal_repay: {
        title: "Погасить кредитную сделку",
      },
    },
  },
  buttons: {
    logout: "Выйти",
    login: "Авторизоваться",
    deposit: "Депозит",
    withdraw: "Отзывать",
    swap: "менять",
    transfer: "Передача",
    market: "Рынок",
    generate_bitcoin_address: "Сгенерировать биткойн-адрес",
    login_and_generate_bitcoin_address: "Войти и создать биткойн-адрес",
    dont_have_peerplays_account: "У вас нет учетной записи Peerplays? ",
    log_in_withdraw: "Войти и выйти",
    log_in_deposit_hbd_hive: "Войти и внести депозит %(assetSymbol)s",
    send: "Отправлять",
    ok: "Ok",
    cancel: "Отмена",
    buy: "Купить",
    sell: "Продавать",
    create_account: "Зарегистрироваться",
    save: "Сохранять",
    lets_go: "Пошли!",
    buy_membership: "Купить пожизненную подписку",
    power_up: "Включите питание",
    power_down: "Выключить",
    vote: "Голосование",
    vest: "Жилет",
    reset_changes: "Сбросить изменения",
    publish_changes: "Опубликовать изменения",
    add: "Добавлять",
    remove: "Удалять",
    done: "Сделанный",
    confirm: "Подтверждать",
    next: "следующий",
    previous: "предыдущий",
    show_only_unread: "Показать только непрочитанные",
  },
  pages: {
    logout: {
      heading: "Выйти",
      title: "Вы успешно вышли из системы",
    },
    login: {
      heading: "Вход в свой аккаунт",
      title: "Вы успешно вышли из системы",
      dont_have_account: "Нет учетной записи? ",
    },
    signUp: {
      heading: "Создать учетную запись",
      already_have_account: "У вас уже есть учетная запись Peerplays? ",
    },
    dashboard: {
      heading: "Приборная доска",
      marketTab: {
        heading: "Выберите торговую пару, которую хотите использовать",
      },
    },
    blocks: {
      heading: "Блоки",
      no_data: "Нет данных",
      blockchain: {
        blockchain: "Блокчейн",
        heading: "Блокчейн PeerPlays",
        current_block: "Текущий блок",
        supply: "Поставлять (%(symbol)s)",
        active_witness: "Активный свидетель",
        confirmation_time: "Время подтверждения",
        search_blocks: "Блоки поиска",
        recent_blocks: "Недавние блоки",
        block: "Блокировать",
        next: "Следующий",
        previous: "Предыдущий",
        transactions: "Транзакции",
        block_information: "Информация о блоке",
        witness: "Свидетель",
      },
      assets: {
        heading: "Активы PeerPlays",
        assets: "Ресурсы",
        search_assets: "Искать активы",
      },
      committees: {
        heading: "Комитеты PeerPlays",
        active_committees: "Активные комитеты",
        search_committees: "Поисковые комитеты",
        committees: "Комитеты",
      },
      witnesses: {
        heading: "Свидетели PeerPlays",
        active_witnesses: "Активные свидетели",
        block_reward: "Награда за блок",
        monthly_earnings: "Ежемесячный доход",
        search_witnesses: "Поиск свидетелей",
        witnesses: "Свидетели",
      },
      fees: {
        heading: "Комиссия PeerPlays",
        fees: "Сборы",
        general: "Общий",
        asset_specific: "Конкретный объект",
        market_specific: "Конкретный рынок",
        account_specific: "Конкретный аккаунт",
        game_specific: "Конкретная игра",
        business_administration: "Управление бизнесом",
        show_less: "Показывай меньше",
        show_more: "Показать больше",
      },
    },
    wallet: {
      heading: "Бумажник",
      activities: "мероприятия",
      assets: "Ресурсы",
      back_to_assets: "Назад к активам",
    },
    market: {
      heading: "Рынок",
      select_pair: "Выберите пару",
      recent_pairs: "Последние пары",
      order_book: "Книга заказов",
      history: "История",
      my_open_orders: "Мои открытые ордера",
      my_order_history: "Моя история заказов",
      buy: "КУПИТЬ",
      sell: "ПРОДАВАТЬ",
    },
    settings: {
      heading: "Настройки",
      general: {
        heading: "Общий",
      },
      key_management: {
        heading: "ключевой менеджмент",
      },
      security: {
        heading: "Безопасность",
      },
      membership: {
        heading: "Членство",
        upgrade_title: "Обновление за %(feesCashback)s%% Cashback",
        upgrade_description:
          "Каждая транзакция в сети Peerplays делится между сетью и реферерами. При регистрации в качестве пожизненного членства учетная запись будет получать кэшбэк в размере %(feesCashback)s за каждую уплаченную комиссию за транзакцию. В качестве бонуса он также будет претендовать на получение реферального дохода от пользователей, зарегистрированных в сети или привлеченных к ней.",
        membership_price:
          "Цена пожизненного членства будет меняться со временем, сейчас она составляет всего %(membershipPrice)s %(defaultToken)s.",
        fee_allocation: "Распределение комиссий",
        fee_allocation_description:
          "Каждый раз, когда %(name)s платит комиссию за транзакцию, эта комиссия делится между несколькими разными аккаунтами. Сеть получает комиссию в размере %(networkFee)s%%, а пожизненный участник, пригласивший %(name)s, получает комиссию в размере %(lifetimeFee)s%%. Регистратором является учетная запись, которая заплатила комиссию за транзакцию для регистрации %(name)s в сети. Регистратор сам решает, как разделить оставшуюся сумму %(referrerTotalFee)s%% между собой и своей собственной партнерской реферальной программой. Регистратор %(name)s решил разделить %(referrerFee)s%% от общей суммы вознаграждения с партнерским реферером и оставить %(registrarFee)s%% от общей суммы вознаграждения себе.",
        network: "Сеть",
        lifetime_reviewer: "Пожизненный реферер",
        registrar: "Регистратор",
        affiliate_referrer: "Партнерский реферер",
        expiration: "Срок действия членства",
        fee_statistics: "Статистика сборов",
        total_fee_paid: "Общая сумма уплаченных сборов",
        pending_fees: "Ожидающие сборы",
        pending_fee_description:
          "Сборы, уплачиваемые %(name)s, делятся между сетью, реферерами и регистраторами один раз за каждый интервал обслуживания %(maintenanceInterval)s секунд). Время следующего обслуживания – %(nextMaintenanceTime)s.",
        vesting_fees: "Вестинговые сборы",
        vesting_description:
          "Большинство сборов доступны сразу, но сборы, превышающие %(vestingThreshold)s %(defaultToken)s (например, те, которые уплачиваются за обновление вашего членства или регистрацию имени премиум-аккаунта), должны удерживаться в общей сложности в течение %(vestingPeriod)s дней.",
        referral_link_title: "Ваша реферальная ссылка",
        referral_link:
          "Дайте ссылку на людей, которых вы хотите порекомендовать в Peerplays: %(link)s/signup/?r=%(name)s",
      },
    },
    voting: {
      heading: "Голосование",
      peerplays_gpos: "Одноранговые игры (GPOS)",
      peerplays_voting: "PeerPlays Голосование",
      lower_case_witnesses: "свидетели",
      lower_case_sons: "sons",
      lower_case_committees: "комитеты",
      gpos: {
        heading: "GPOS",
        join_gpos:
          "Присоединяйтесь к GPOS, переведя свои %(defaultToken)s на баланс GPOS.",
        consistently_participate:
          "Постоянно участвуйте в голосовании за лучших Свидетелей, Советников, Предложений и СЫНОВ. Делитесь захватывающими новостями и DApps, доступными на Peerplays, с другими.",
        gpos_description:
          "Чем больше пользы приносит блокчейн Peerplays благодаря его операциям, тем больше зарабатывают те, кто помогает сделать его безопасным!",
        rewards_label:
          "Если вы хотите увеличить вознаграждение за участие, вы можете сделать это двумя способами:",
        rewards_way_first:
          "1. Переведите больше %(defaultToken)s на свой баланс GPOS.",
        rewards_way_second: "2. Делитесь Peerplay с другими",
        decentralized_autonomous_cooperative:
          "Вместе в качестве децентрализованного автономного кооператива (DAC) мы можем гарантировать, что Peerplays останется самой безопасной доказуемо честной цепочкой блоков в мире.",
        gpos_balance: "GPOS Остаток средств",
        voting_performance: "Результаты голосования",
        qualified_reward: "Квалифицированная награда",
        estimated_rake_reward: "Расчетное вознаграждение за рейк",
        available_balance: "Доступные средства:",
        read_less: "Читать меньше",
        read_more: "Читать далее",
        performance_string: {
          max_rewards: "Максимальные награды",
          good_rewards: "Хорошие награды",
          great_rewards: "Отличные награды",
          low_rewards: "Низкие награды",
          ok_rewards: "ОК Награды",
          critical_low: "Критический минимум",
          lower_rewards: "Более низкие награды",
          no_rewards: "Нет наград",
        },
        powerUp: {
          power_up_description:
            "Когда вы активируете свои %(defaultToken)s в блокчейне Peerplays, вы делаете свои первые шаги к участию в Децентрализованном автономном кооперативе (DAC), который является волшебством в технологии блокчейна. Это означает, что вы будете:",
          power_up_lists: {
            first:
              "Станьте большой частью чего-то особенного в глобальном масштабе",
            second: "Получайте вознаграждение за участие за свои усилия",
            third: "Право хвастаться перед семьей и друзьями",
            fourth: "Ставьте свои %(defaultToken)s во время участия",
            fifth: "Помогите защитить блокчейн Peerplays",
          },
        },
        powerDown: {
          power_down_description:
            "Когда вы отключите питание, вам потребуется 30 дней, чтобы полностью снять баланс %(defaultToken)s. Вы будете продолжать получать вознаграждения за участие в течение этого времени, пока вы участвуете. После отключения питания вы можете использовать свои %(defaultToken)s как любую другую криптовалюту. Это означает, что вы будете:",
          power_down_lists: {
            first:
              "Все еще быть частью чего-то особенного, просто не так много",
            second: "Больше не помогает защищать блокчейн Peerplays",
            third: "Больше не получать награды за участие",
            fourth: "Потерять право хвастаться",
            fifth: "Прекратите размещать свои %(defaultToken)s",
          },
        },
      },
      sons: {
        heading: "Sons",
      },
      witnesses: {
        heading: "Свидетели",
      },
      proxy: {
        heading: "Прокси",
      },
      committees: {
        heading: "Комитеты",
      },
    },
    user: {
      heading: "Вся деятельность",
      discription: "Страница профиля",
    },
    modal: {
      transaction_modal: {
        heading: "Пожалуйста, подтвердите транзакцию",
      },
      password_modal: {
        heading: "Пароль",
      },
    },
  },
  links: {
    create_account: "Зарегистрироваться",
    see_all_account_activity: "Просмотреть всю активность аккаунта",
    profile: "профиль",
    mark_all_read: "отметить все как прочитанное",
  },
  field: {
    options: {
      lock_wallet: "минуты ",
    },
    placeholder: {
      user_name: "Введите имя пользователя",
      password: "Введите пароль",
      withdraw_public_key: "Отозвать открытый ключ",
      withdraw_address: "Адрес вывода",
      hive_blockchain_account: "Блокчейн-аккаунт Hive",
      amount: "количество",
      quantity: "Количество",
      to: "К",
      memo: "Памятка",
      price: "Цена",
      total: "Общий",
      re_enter_password:
        "Повторно введите автоматически сгенерированный пароль",
      confirm_password: "Подтвердить Пароль",
      opening_balance: "Начальное сальдо:",
      new_balance: "Новый баланс:",
      available_balance: "Доступные средства:",
      search_accounts: "Поиск аккаунтов",
      from: "из",
    },
    labels: {
      withdraw_public_key_address: "Отозвать открытый ключ и адрес",
      hive_blockchain_account: "Блокчейн-аккаунт Hive",
      fees: "Комиссии: %(feeAmount)s %(defaultAsset)s",
      market_fee: "Рыночная комиссия",
      balance: "Остаток средств",
      auto_generated_password: "Ваш автоматически сгенерированный пароль",
      keep_password_safe:
        "Храните свой пароль в безопасности, чтобы не потерять средства.",
      download_recovery_password: "Загрузите файл восстановления пароля здесь",
      select_language: "Выберите язык",
      browser_notifications: "Уведомления браузера",
      faucet: "кран",
      faucet_url: "URL крана: ",
      copy_url: "Скопировать URL",
      setting_saved: "Настройка сохранена",
      lock_wallet: "Заблокировать кошелек",
      select_keys: "Выберите ключи для генерации:",
      generated_key:
        "Запрошенный вами ключ %(generatedKeyLabel)s выглядит следующим образом:",
      advanced_settings: "Расширенные настройки",
      hello: "Привет",
      approved_by: "Одобрено %(localStorageAccount)s",
      not_approved_by: "не одобрено %(localStorageAccount)s",
      vote_for: "Проголосовать за %(tab)s",
      vote_for_proxy: "Проксируйте свой голос на другие аккаунты",
      not_available: "Нет в наличии",
      account_name: "Название аккаунта",
      true: "Истинный",
      proxy_voting_account: "Прокси-аккаунт для голосования",
      no_proxy: "Нет прокси",
      fee: "Платеж",
      account_to_upgrade: "Аккаунт для обновления",
      upgrade_lifetime: "Повышение статуса до пожизненного участника",
      buy_at_least: "Купить не менее",
      seller: "продавец",
      swapper: "своппер",
      vesting_amount: "Сумма вестинга",
      withdrawal_amount: "Сумма вывода",
      today: "Сегодня",
      yesterday: "вчерашний день",
      order_to_cancel: "Заказ на отмену",
      threshold: "Порог",
      desired_witnesses: "Желаемые свидетели",
      desired_committees: "Желаемые комитеты",
      desired_sons: "Желаемые сыновья",
    },
    comments: {
      deposit_hbd:
        "Чтобы перевести %(assetSymbol)s на %(accountName)s, отправьте свои средства на son-account в блокчейне Hive с памяткой %(accountName)s",
      public_memo: "Эта памятка общедоступна",
    },
    checkBoxes: {
      cannot_recover_my_lost_password:
        "Я понимаю, что Peerplays не может восстановить мой утерянный пароль",
      securely_saved_my_password: "Я надежно сохранил свой пароль",
      enable_notifications: "Включить уведомления",
      key_management_group: ["Активный", "Владелец", "Памятка"],
    },
    errors: {
      no_key_for_password: "Для этого пароля нет ключа %(role)s",
      login_first: "Пожалуйста, войдите сначала",
      checking_sons_status: "Дождитесь проверки состояния сети SON.",
      user_name_first: "Сначала укажите действительное имя пользователя",
      same_account: "Так же, как ваш аккаунт",
      no_account: "аккаунт не найден",
      added_account: "Аккаунт уже добавлен",
      premium_username:
        "Это премиальное имя, которое не поддерживается этим сборщиком..",
      username_limits:
        "Имя пользователя должно начинаться со строчной буквы и не должно содержать заглавных букв, специальных символов или только цифр.",
      user_not_found: "Пользователь не найден",
      password_incorrect: "Неверный пароль",
      username_required: "Имя пользователя требуется",
      password_required: "требуется пароль",
      password_should_be_long: "Пароль должен быть не короче 12 символов",
      password_not_match: "Пароль не совпадает",
      username_taken: "Логин уже занят",
      confirmation_required: "Требуется подтверждение",
      save_your_password: "Пожалуйста, сохраните пароль",
      password_white_space: "Пароль не должен содержать пробелов",
      field_is_required: "Это поле обязательно к заполнению",
      server_error: "Ошибка сервера, повторите попытку позже.",
      amount_should_greater: "Сумма должна быть больше 0",
      balance_not_enough: "Баланса не хватает",
      balance_not_enough_to_pay: "Баланса недостаточно для оплаты комиссии",
      not_your_account: "Не ваша учетная запись",
      sons_not_available: "Сеть SON сейчас недоступна",
      first_generate_bitcoin_address:
        "Сначала создайте биткойн-адреса на вкладке депозита.",
      from_required: "От требуется",
      to_required: "Требуется",
      amount_required: "Требуется сумма",
      withdraw_add_required: "Требуется адрес для вывода",
      withdraw_pub_key_required: "Требуется отозвать открытый ключ",
      sons_not_available_try_again:
        "Сеть SON сейчас недоступна. Пожалуйста, попробуйте позже!",
      transaction_unable: "Невозможно обработать транзакцию!",
      price_should_greater: "Цена должна быть больше 0",
      quantity_should_greater: "Количество должно быть больше 0",
      total_should_greater: "Сумма должна быть больше, чем 0",
      assets_must_different: "Активы должны быть разными",
      assets_should_be: "Один из активов должен быть %(defaultToken)s",
      available_balance_cannot_greater:
        "Не может быть больше доступного остатка",
      withdraw_amount_required: "Требуется сумма для вывода",
      deposit_amount_should_greater: "Сумма депозита должна быть больше 0",
      deposit_amount_required: "Сумма депозита в обязательном порядке",
      memo_warning:
        "ПРЕДУПРЕЖДЕНИЕ. Если вы замените ключ для заметок, вы не сможете читать старые заметки при входе в систему с вашим паролем.",
      select_role: "Пожалуйста, выберите хотя бы одну роль",
      wait_loading_keys: "Дождитесь загрузки пользовательских ключей",
      keys_already_used: "Эти ключи уже используются для %(role)s разрешения",
      need_to_vest_gpos: "Сначала вам нужно пополнить баланс GPOS.",
      asset_required: "Требуется актив",
      cannot_send_yourself: "Не могу отправить себе",
      unable_transaction: "Невозможно обработать транзакцию!",
    },
    success: {
      successfully_transferred:
        "Успешно переведено %(amount)s %(asset)s к %(to)s",
      successfully_withdraw: "Успешно отозвать",
      successfully_withdrawn: "Успешно отозвано %(withdrawAmount)s %(symbol)s",
      successfully_deposited:
        "Успешно депонирован %(depositAmount)s %(symbol)s",
      limit_order_successfully: "Вы успешно создали лимитный ордер",
      swap_order_successfully: "Вы успешно создали своп-ордер",
      saved_changes: "Вы успешно сохранили изменения",
      account_upgraded_successfully:
        "Ваша учетная запись успешно обновлена до пожизненной учетной записи членства",
      published_proxy: "Вы успешно опубликовали свой прокси",
      published_votes: "Вы успешно опубликовали свои голоса",
      canceled_limit_order: "Вы успешно отменили заказ #%(selectedOrderId)s",
    },
  },
  tableHead: {
    block_id: "Идентификатор блока",
    time: "Время",
    witness: "Свидетель",
    transaction: "Сделка",
    asset: "Актив",
    quote_asset: "Котировать актив",
    available: "Доступный",
    change: "Изменение (24 часа)",
    price: "Цена",
    volume: "Объем",
    current_price: "Текущая цена",
    market_change: "Изменять",
    type: "Тип",
    info: "Информация",
    id: "Я БЫ",
    fee: "Платеж",
    expiration: "Срок действия",
    date: "Свидание",
    symbol: "Символ",
    max_supply: "Максимальный запас",
    precision: "Точность",
    issuer: "Эмитент",
    rank: "Классифицировать",
    name: "Имя",
    total_votes: "Всего голосов",
    url: "URL",
    operation: "Операция",
    fee_type: "Тип комиссии",
    standard_fee: "Стандартная плата",
    last_block: "Последний блок",
    missed_blocks: "Пропущенные блоки",
    website: "Веб-сайт",
    action: "Действие",
    votes: "Голоса",
  },
  tooltips: {
    copy: "копировать",
    copied: "скопировано",
    mark_read: "пометить, как прочитанное",
    mark_unread: "отметить как непрочитанное",
  },
};
