export const en = {
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
          "%(from)s, финансируемый %(symbol)s комиссионный пул с %(amount)s",
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
      },
      vesting_balance_withdraw: {
        title: "Вывод вестингового баланса",
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
    market: "Рынок",
    generate_bitcoin_address: "Сгенерировать биткойн-адрес",
    login_and_generate_bitcoin_address: "Войти и создать биткойн-адрес",
    dont_have_peerplays_account: "У вас нет учетной записи Peerplays? ",
    log_in_withdraw: "Войти и выйти",
    log_in_deposit_hbd_hive: "Войти и внести депозит",
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
      blockchain: {
        blockchain: "Блокчейн",
        heading: "Блокчейн PeerPlays",
        current_block: "Текущий блок",
        supply: "Поставлять (%(symbol)s)",
        active_witness: "Активный свидетель",
        confirmation_time: "Время подтверждения",
        search_blocks: "Search Blocks",
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
        game_specific: "Game Specific",
        business_administration: "Bussiness Administration",
        show_less: "Show Less",
        show_more: "Show More",
      },
    },
    wallet: {
      heading: "Wallet",
      activities: "Activities",
      back_to_assets: "Back to Assets",
    },
    market: {
      heading: "Market",
      select_pair: "Select Pair",
      recent_pairs: "Recent Pairs",
      order_book: "Order Book",
      history: "History",
      my_open_orders: "My Open Orders",
      my_order_history: "My Order History",
      buy: "BUY",
      sell: "SELL",
    },
    settings: {
      heading: "Settings",
      general: {
        heading: "General",
      },
      keyManagement: {
        heading: "key Management",
      },
      security: {
        heading: "Security",
      },
      membership: {
        heading: "Membership",
        upgrade_title: "Upgrade for %(feesCashback)s  Cashback",
        upgrade_description:
          "Every transaction on the Peerplays network is divided between the network and referrers. By registering to a Lifetime Membership the account will receive %(feesCashback)s cashback on every transaction fee paid. As a bonus it will also qualify to earn referral income from users registered with or refered to the network.",
        membership_price:
          "A Lifetime Membership price will change over time, right now it is only %(membershipPrice)s %(defaultToken)s.",
        fee_allocation: "Fee Allocation",
        fee_allocation_description:
          "Every time %(name)s pays a transaction fee, that fee is divided among several different accounts. The network takes a %(networkFee)s cut, and the Lifetime Member who referred %(name)s gets a %(lifetimeFee)s cut. The registrar is the account that paid the transaction fee to register %(name)s with the network. The registrar gets to decide how to divide the remaining %(referrerTotalFee)s between themselves and their own Affiliate Referrer program. %(name)s s registrar chose to share %(referrerFee)s of the total fee with the Affiliate Referrer and keep %(registrarFee)s of the total fee for themselves.",
        network: "Network",
        lifetime_reviewer: "Lifetime Referrer",
        registrar: "Registrar",
        affiliate_referrer: "Affiliate Referrer",
        expiration: "Membership Expiration",
        fee_statistics: "Fee Statistics",
        total_fee_paid: "Total Fees Paid",
        pending_fees: "Pending Fees",
        pending_fee_description:
          "Fees paid by %(name)s are divided among the network, referrers, and registrars once every maintenance interval %(maintenanceInterval)s seconds). The next maintenance time is %(nextMaintenanceTime)s",
        vesting_fees: "Vesting Fees",
        vesting_description:
          "Most fees are made available immediately, but fees over %(vestingThreshold)s %(defaultToken)s (such as those paid to upgrade your membership or register a premium account name) must vest for a total of %(vestingPeriod)s days.",
        referral_link_title: "Your referral link",
        referral_link:
          "Give this to link to people you want to refer to Peerplays: %(link)s/signup/?r=%(name)s",
      },
    },
    voting: {
      heading: "Voting",
      peerplays_gpos: "PeerPlays (GPOS)",
      peerplays_voting: "PeerPlays Voting",
      lower_case_witnesses: "witnesses",
      lower_case_sons: "sons",
      lower_case_committees: "committees",
      gpos: {
        heading: "GPOS",
        join_gpos: "Join GPOS by transferring your PPY to your GPOS balance.",
        consistently_participate:
          "Consistently participate in voting for the best Witnesses, Advisors, Proposals, and SONs. Share the exciting news and DApps available on Peerplays with others.",
        gpos_description:
          "The more value that comes into Peerplays blockchain through its operations, the more those that participate to help make it secure will earn!",
        rewards_label:
          "If you want to increase your participation rewards you can do it two ways:",
        rewards_way_first: "1. Transfer more PPY into your GPOS balance",
        rewards_way_second: "2. Share Peerplays with others",
        decentralized_autonomous_cooperative:
          "Together as a Decentralized Autonomous Cooperative (DAC), we can ensure Peerplays remains the most secure provably fair blockchain globally.",
        gpos_balance: "GPOS Balance",
        voting_performance: "Voting Performance",
        qualified_reward: "Qualified Reward",
        estimated_rake_reward: "Estimated Rake Reward",
        available_balance: "Available Balance:",
        read_less: "Read less",
        read_more: "Read more",
        performance_string: {
          max_rewards: "Max Rewards",
          good_rewards: "Good Rewards",
          great_rewards: "Great Rewards",
          low_rewards: "Low Rewards",
          ok_rewards: "OK Rewards",
          critical_low: "Critical Low",
          lower_rewards: "Lower Rewards",
          no_rewards: "No Rewards",
        },
        powerUp: {
          power_up_description:
            "When you Power Up your PPY on the Peerplays blockchain you are taking your first steps into participating in the Decentralized Autonomous Cooperative (DAC) that is the magic in blockchain tech. This means you will:",
          power_up_lists: {
            first: "Become a big part of something special on a global scale",
            second: "Earn participation rewards for your efforts",
            third: "Bragging rights to family and friends",
            fourth: "Stake your PPY while you participate",
            fifth: "Help secure the Peerplays blockchain",
          },
        },
        powerDown: {
          power_down_description:
            "When you Power Down it will take 30 days for you to withdraw your PPY balance in full. You will continue to receive participation rewards during that time so long as you have been participating. After Power Down you can then use your PPY like any other cryptocurrency. This means you will:",
          power_down_lists: {
            first: "Still be a part of something special, just not as much",
            second: "No longer helping secure the Peerplays blockchain",
            third: "No longer earn participation rewards",
            fourth: "Lose bragging rights",
            fifth: "Stop staking your PPY",
          },
        },
      },
      sons: {
        heading: "Sons",
      },
      witnesses: {
        heading: "Witnesses",
      },
      proxy: {
        heading: "Proxy",
      },
      committees: {
        heading: "Committees",
      },
    },
    modal: {
      transaction_modal: {
        heading: "Please confirm the transaction",
      },
      password_modal: {
        heading: "Password",
      },
    },
  },
  links: {
    create_account: "Create account",
    see_all_account_activity: "See all account activity",
  },
  field: {
    placeholder: {
      user_name: "Enter username",
      password: "Enter password",
      withdraw_public_key: "Withdraw public key",
      withdraw_address: "Withdraw address",
      hive_blockchain_account: "Hive blockchain account",
      amount: "amount",
      quantity: "Quantity",
      to: "To",
      memo: "Memo",
      price: "Price",
      total: "Total",
      re_enter_password: "Re-enter your auto-generated password",
      confirm_password: "Confirm password",
      opening_balance: "Opening Balance:",
      new_balance: "New Balance:",
      available_balance: "Available Balance:",
      search_accounts: "Search Accounts",
    },
    labels: {
      withdraw_public_key_address: "Withdraw Public key & Address",
      hive_blockchain_account: "Hive blockchain account",
      fees: "Fees : %(feeAmount)s %(defaultAsset)s",
      market_fee: "Market Fee",
      balance: "Balance",
      auto_generated_password: "Your auto-generated password",
      keep_password_safe: "Keep your password safe to avoid losing any funds. ",
      download_recovery_password: "Download Recovery password file here",
      select_language: "Select Language",
      browser_notifications: "Browser Notifications",
      faucet: "Faucet",
      faucet_url: "Faucet URL: ",
      copy_url: "Copy URL",
      setting_saved: "Setting Saved",
      lock_wallet: "Lock Wallet",
      select_keys: "Select keys to be generated:",
      generated_key:
        "The %(generatedKeyLabel)s key you requested is as follows:",
      advanced_settings: "Advanced Settings",
      hello: "Hello",
      approved_by: "Approved by %(localStorageAccount)s",
      not_approved_by: "Approved by %(localStorageAccount)s",
      vote_for: "Vote for %(tab)s",
      vote_for_proxy: "Proxy your vote to other accounts",
      not_available: "Not available",
      account_name: "Account name",
      true: "True",
      proxy_voting_account: "Proxy Voting Account",
      no_proxy: "No Proxy",
      fee: "Fee",
      account_to_upgrade: "Account to upgrade",
      upgrade_lifetime: "Upgrade to lifetime member",
      buy_at_least: "Buy at least",
      seller: "seller",
      vesting_amount: "Vesting amount",
      withdrawal_amount: "Withdrawal amount",
    },
    comments: {
      deposit_hbd:
        "To deposit %(assetSymbol)s to %(accountName)s please send your funds to son-account on the Hive blockchain with the memo %(accountName)s",
      only_members_can_read: "Only members with memo key can read your memos",
    },
    checkBoxes: {
      cannot_recover_my_lost_password:
        "I understand Peerplays cannot recover my lost password",
      securely_saved_my_password: "I have securely saved my password",
      enable_notifications: "Enable Notifications",
    },
    errors: {
      same_account: "Same as your account",
      no_account: "Account not found",
      premium_username:
        "This is a premium name which is not supported by this faucet.",
      username_limits:
        "Username should start with lowercase letter and should not contain capital letter or special characters or only digits",
      user_not_found: "User not found",
      password_incorrect: "Password incorrect",
      username_required: "Username is required",
      password_required: "Password is required",
      password_should_be_long: "Password should be at least 12 characters long",
      password_not_match: "Password do not match",
      username_taken: "Username Already taken",
      confirmation_required: "Confirmation Required",
      save_your_password: "Please save your password",
      password_white_space: "Password should not contain any white spaces",
      field_is_required: "This field is required",
      server_error: "Server error, please try again later.",
      amount_should_greater: "Amount should be greater than 0",
      balance_not_enough: "Balance is not enough",
      balance_not_enough_to_pay: "Balance is not enough to pay the fee",
      not_your_account: "Not your Account",
      sons_not_available: "SONs network is not available now",
      first_generate_bitcoin_address:
        "Please first generate bitcoin addresses at deposit tab",
      from_required: "From is required",
      to_required: "To is required",
      amount_required: "Amount is required",
      withdraw_add_required: "Withdraw address is required",
      withdraw_pub_key_required: "Withdraw public key is required",
      sons_not_available_try_again:
        "SONs network is not available now. Please try again later!",
      transaction_unable: "Unable to process the transaction!",
      price_should_greater: "Price should be greater than 0",
      assets_must_different: "Assets Must Be Different",
      assets_should_be: "One of the assets should be %(defaultToken)s",
      available_balance_cannot_greater:
        "Can not be greater than available balance",
      withdraw_amount_required: "Withdraw amount is required",
      deposit_amount_should_greater: "Deposit amount should be greater than 0",
      deposit_amount_required: "Deposit amount in required",
      memo_warning:
        "WARNING: If you replace the memo key you will be unable to read old memos when logging in with your password",
      select_role: "Please at least select one role",
      wait_loading_keys: "Please wait for loading user keys",
      keys_already_used:
        "These keys are already in used for %(role)s permissions",
      need_to_vest_gpos: "You need to Vest some GPOS balance first",
      asset_required: "Asset is required",
      cannot_send_yourself: "Can not send to yourself",
      unable_transaction: "Unable to process the transaction!",
    },
    success: {
      successfully_transferred:
        "Успешно переведено %(amount)s %(asset)s к %(to)s",
      successfully_withdraw: "Успешно отозвать",
      successfully_withdrawn:
        "Успешно отозвано %(withdrawAmount)s %(precision)s",
      successfully_deposited:
        "Успешно депонирован %(depositAmount)s %(symbol)s",
      limit_order_successfully: "You have successfully created a limit order",
      saved_changes: "Вы успешно сохранили изменения",
      account_upgraded_successfully:
        "Ваша учетная запись успешно обновлена до пожизненной учетной записи членства",
      published_proxy: "Вы успешно опубликовали свой прокси",
      published_votes: "Вы успешно опубликовали свои голоса",
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
};
