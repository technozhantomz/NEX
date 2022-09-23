export const en = {
  app_init: {
    check_latency: "Running latency checks...",
    check_latency_feedback:
      "Running latency checks (%(pinged)s/%(totalToPing)s nodes)",
    check_latency_feedback_country:
      "Latency check in best country (%(pinged)s/%(totalToPing)s nodes)",
    check_latency_feedback_last:
      "Latency check for last connected node (%(pinged)s/%(totalToPing)s nodes)",
    check_latency_feedback_region:
      "Latency check in best region (%(pinged)s/%(totalToPing)s nodes)",
    check_latency_feedback_rest:
      "Latency check for remaining nodes (%(pinged)s/%(totalToPing)s nodes)",
    check_latency_feedback_world:
      "Latency check in each region (%(pinged)s/%(totalToPing)s nodes)",
    connecting: "Connecting to API server: %(server)s",
  },
  transaction: {
    feeTypes: {
      _none: "Free of Charge",
      basic_fee: "Basic Fee",
      distribution_base_fee: "Distribution base fee",
      distribution_fee_per_holder: "Distribution price per holder",
      fee: "Regular Transaction Fee",
      fee_per_day: "Price per day",
      fee_per_kb: "Price per KByte Transaction Size",
      long_symbol: "Longer Symbols",
      lottery_asset: "Lottery asset",
      membership_annual_fee: "Annual Membership",
      membership_lifetime_fee: "Lifetime Membership",
      premium_fee: "Fee for Premium Names",
      price_per_kbyte: "Price per KByte Transaction Size",
      price_per_output: "Price per recipient",
      symbol3: "Symbols with 3 Characters",
      symbol4: "Symbols with 4 Characters",
    },
    trxTypes: {
      account_create: {
        title: "Create account",
        description: "%(registrarName)s, registered the account , %(userName)s",
      },
      account_role_create: {
        title: "Create account role",
      },
      account_role_delete: {
        title: "Delete account role",
      },
      account_role_update: {
        title: "Update account role",
      },
      account_transfer: {
        title: "Transfer Account",
      },
      account_update: {
        title: "Update account",
        description: "%(user)s, updated account data",
      },
      account_upgrade: {
        title: "Upgrade Account",
        description: "%(user)s, upgraded account to lifetime member",
      },
      account_whitelist: {
        title: "Account whitelist",
        description: "%(issuer)s, %(status)s the account, %(listed)s",
      },
      affiliate_payout: {
        title: "payout affiliate",
      },
      affiliate_referral_payout: {
        title: "Payout referral affiliate",
      },
      all: {
        title: "Show all",
      },
      assert: {
        title: "Assert operation",
      },
      asset_bid_collateral: {
        title: "Bid collateral",
      },
      asset_claim_fee_pool: {
        title: "Claim fee pool balance",
      },
      asset_claim_fees: {
        title: "Claim asset fees",
      },
      asset_claim_pool: {
        title: "Claim asset fee pool",
        description:
          "%(issuer)s, claimed %(claimed)s %(claimedSymbol)s from %(asset)s fee pool",
      },
      asset_create: {
        title: "Create asset",
        description: "%(issuer)s, created the asset %(symbol)s",
      },
      asset_dividend_distribution: {
        title: "Asset dividend distribution",
      },
      asset_fund_fee_pool: {
        title: "Fund asset fee pool",
        description:
          "%(from)s, funded %(symbol)s fee pool with %(amount)s %(defaultToken)s",
      },
      asset_global_settle: {
        title: "Global asset settlement",
      },
      asset_issue: {
        title: "Issue asset",
        description:
          "%(issuer)s, issued %(assetAmount)s %(symbol)s to, %(receiver)s",
      },
      asset_publish_feed: {
        title: "Publish feed",
      },
      asset_reserve: {
        title: "Burn asset",
      },
      asset_settle: {
        title: "Asset settlement",
      },
      asset_settle_cancel: {
        title: "Cancel asset settlement",
      },
      asset_update: {
        title: "Update asset",
        description: "%(issuer)s, updated asset %(symbol)s",
      },
      asset_update_bitasset: {
        title: "Update SmartCoin",
      },
      asset_update_dividend: {
        title: "Update asset dividend",
      },
      asset_update_feed_producers: {
        title: "Update asset feed producers",
        description:
          "%(issuer)s, updated the feed producers for the asset %(asset)s",
      },
      asset_update_issuer: {
        title: "Update asset owner",
        description:
          "%(issuer)s, transferred rights for %(asset)s to, %(newOwner)s",
      },
      balance_claim: {
        title: "Claim balance",
      },
      bet_adjusted: {
        title: "Adjusted bet",
      },
      bet_cancel: {
        title: "Cancel bet",
      },
      bet_canceled: {
        title: "Canceled bet",
      },
      betting_market_create: {
        title: "Create betting market",
      },
      betting_market_group_cancel: {
        title: "Cancel betting market group",
      },
      betting_market_group_create: {
        title: "Create betting market group",
      },
      betting_market_group_resolve: {
        title: "Resolve betting market group",
      },
      betting_market_group_resolved: {
        title: "Resolved betting market group",
      },
      betting_market_group_update: {
        title: "Update betting market group",
      },
      betting_market_rules_create: {
        title: "Create betting market rules",
      },
      betting_market_rules_update: {
        title: "Update betting market rules",
      },
      betting_market_update: {
        title: "Update betting market",
      },
      bet_matched: {
        title: "Matched bet",
      },
      bet_place: {
        title: "Place bet",
      },
      bid: {
        title: "Bid",
      },
      bid_collateral: {
        title: "Collateral bid",
      },
      blind_transfer: {
        title: "Blinded transfer",
      },
      call_order_update: {
        title: "Update margin",
      },
      cancel_offer: {
        title: "Cancel offer",
      },
      committee_member_create: {
        title: "Create committee member",
      },
      committee_member_update: {
        title: "Update committee member",
      },
      committee_member_update_global_parameters: {
        title: "Global parameters update",
      },
      custom: {
        title: "Custom",
      },
      custom_account_authority_create: {
        title: "Create custom account authority",
      },
      custom_account_authority_delete: {
        title: "Delete custom account authority",
      },
      custom_account_authority_update: {
        title: "Update custom account authority",
      },
      custom_permission_create: {
        title: "Create custom permission",
      },
      custom_permission_delete: {
        title: "Delete custom permission",
      },
      custom_permission_update: {
        title: "Update custom permission",
      },
      event_create: {
        title: "Create event",
      },
      event_group_create: {
        title: "Create event group",
      },
      event_group_delete: {
        title: "Delete event group",
      },
      event_group_update: {
        title: "Update event group",
      },
      event_update: {
        title: "Update event",
      },
      event_update_status: {
        title: "Update event status",
      },
      execute_bid: {
        title: "Execute bid",
      },
      fba_distribute_operation: {
        title: "Fee backed asset distribution",
      },
      fill_order: {
        title: "Fill order",
        description:
          "%(user)s, bought %(paysAmount)s for %(receivesAmmount)s for order #%(id)s",
      },
      finalize_offer: {
        title: "Finalize offer",
      },
      game_move: {
        title: "Game move",
      },
      htlc_create: {
        title: "HTLC create",
      },
      htlc_extend: {
        title: "HTLC extend",
      },
      htlc_redeem: {
        title: "HTLC redeem",
      },
      htlc_redeemed: {
        title: "HTLC redeemed",
      },
      htlc_refund: {
        title: "HTLC refund",
      },
      limit_order_cancel: {
        title: "Cancel order",
        description: "%(user)s, cancelled order #%(id)s",
      },
      limit_order_create: {
        title: "Place order",
        description:
          "%(creator)s, placed order #%(orderId)s to buy %(buyAmount)s for %(sellAmount)s",
      },
      swap_order_create: {
        title: "Swap Order",
      },
      lottery_asset_create: {
        title: "Create lottery asset",
      },
      lottery_end: {
        title: "End lottery",
      },
      lottery_reward: {
        title: "Reward lottery",
      },
      override_transfer: {
        title: "Override transfer",
      },
      nft_approve: {
        title: "Approve nfts",
      },
      nft_metadata_create: {
        title: "Create nft metadata",
      },
      nft_metadata_update: {
        title: "Update nft metadata",
      },
      nft_mint: {
        title: "Mint nft",
      },
      nft_safe_transfer_from: {
        title: "nft safe transfer from",
      },
      nft_set_approval_for_all: {
        title: "Set approval for all nfts",
      },
      offer: {
        title: "Offer",
      },
      proposal_create: {
        title: "Create proposal",
      },
      proposal_delete: {
        title: "Delete proposal",
      },
      proposal_update: {
        title: "Update proposal",
      },
      ticket_create: {
        title: "Create ticket",
      },
      sweeps_vesting_claim: {
        title: "Clain sweeps vesting",
      },
      sidechain_address_add: {
        title: "Add sidechain address",
      },
      sidechain_address_delete: {
        title: "Delete sidechain address",
      },
      sidechain_address_update: {
        title: "Update sidechain address",
      },
      sidechain_transaction_create: {
        title: "Create sidechain transaction",
      },
      sidechain_transaction_send: {
        title: "Send sidechain transaction",
      },
      sidechain_transaction_settle: {
        title: "Settle sidechain transaction",
      },
      sidechain_transaction_sign: {
        title: "Sign sidechain transaction",
      },
      son_create: {
        title: "Create SON",
      },
      son_delete: {
        title: "Delete SON",
      },
      son_heartbeat: {
        title: "Heartbeat SON",
      },
      son_maintenance: {
        title: "SON maintenance",
      },
      son_report_down: {
        title: "Report SON down",
      },
      son_update: {
        title: "Update SON",
      },
      son_wallet_deposit_create: {
        title: "Create deposit son wallet",
      },
      son_wallet_deposit_process: {
        title: "Process deposit SON wallet",
      },
      son_wallet_recreate: {
        title: "Recreate SON wallet",
      },
      son_wallet_update: {
        title: "Update SON wallet",
      },
      son_wallet_withdraw_create: {
        title: "Create withdraw SON wallet",
      },
      son_wallet_withdraw_process: {
        title: "Process withdraw SON wallet",
      },
      sport_create: {
        title: "Create sport",
      },
      sport_delete: {
        title: "Delete sport",
      },
      sport_update: {
        title: "Update sport",
      },
      ticket_purchase: {
        title: "Purchase ticket",
      },
      tournament_create: {
        title: "Create tournament",
      },
      tournament_join: {
        title: "Join tournament",
      },
      tournament_payout: {
        title: "Payout tournament",
      },
      tournament_leave: {
        title: "Leave tournament",
      },
      transfer: {
        title: "Transfer",
        description: "%(sender)s, send %(amount)s %(symbol)s to , %(receiver)s",
      },
      transfer_from_blind: {
        title: "Transfer from blinded account",
      },
      transfer_to_blind: {
        title: "Transfer to blinded account",
      },
      vesting_balance_create: {
        title: "Create vesting balance",
        description: "%(creator)s, vest %(amount)s %(symbol)s in GPOS",
      },
      vesting_balance_withdraw: {
        title: "Withdraw vesting balance",
        description: "%(owner)s, withdraw %(amount)s %(symbol)s from GPOS",
      },
      withdraw: {
        title: "Withdraw",
      },
      withdraw_permission_claim: {
        title: "Claim withdrawal permission",
      },
      withdraw_permission_create: {
        title: "Create withdrawal permission",
      },
      withdraw_permission_delete: {
        title: "Delete withdrawal permission",
      },
      withdraw_permission_update: {
        title: "Update withdrawal permission",
      },
      witness_create: {
        title: "Create witness",
      },
      witness_update: {
        title: "Update witness",
      },
      witness_withdraw_pay: {
        title: "Witness pay withdrawal",
      },
      worker_create: {
        title: "Create worker",
        description:
          "%(user)s, created a worker proposal with daily pay of %(defaultToken)s",
      },
      credit_offer_create: {
        title: "Create credit offer",
      },
      credit_offer_delete: {
        title: "Delete credit offer",
      },
      credit_offer_update: {
        title: "Update credit offer",
      },
      credit_offer_accept: {
        title: "Accept credit offer",
      },
      credit_deal_repay: {
        title: "Repay credit deal",
      },
    },
  },
  buttons: {
    enter_amount: "Enter an amount",
    swap_coins: "Swap coins",
    login_and_swap_coins: "Login & swap coins",
    logout: "Logout",
    login: "Log in",
    deposit: "Deposit",
    withdraw: "Withdraw",
    swap: "Swap",
    transfer: "Transfer",
    market: "Market",
    generate_bitcoin_address: "Generate Bitcoin address",
    login_and_generate_bitcoin_address: "Log in & Generate Bitcoin Address",
    dont_have_peerplays_account: "Dont have a Peerplays account? ",
    log_in_withdraw: "Log in & Withdraw",
    log_in_deposit_hbd_hive: "Log in & Deposit %(assetSymbol)s",
    send: "Send",
    ok: "Ok",
    cancel: "Cancel",
    buy: "Buy",
    sell: "Sell",
    create_account: "Create account",
    save: "Save",
    lets_go: "Let’s Go!",
    buy_membership: "Buy Lifetime Subscription",
    power_up: "Power Up",
    power_down: "Power Down",
    vote: "Vote",
    vest: "Vest",
    reset_changes: "Reset Changes",
    publish_changes: "Publish Changes",
    add: "Add",
    remove: "Remove",
    done: "Done",
    confirm: "Confirm",
    previous: "Previous",
    next: "Next",
    show_only_unread: "Show only unread",
  },
  connection: {
    automatic_reconnect:
      " After %(reconnect_in_seconds)s seconds a reconnection attempt will be made automatically.",
    manual_reconnect: "Try reconnecting now",
    manual_ping_and_narrow_down: "Narrow down nodes and ping",
    title_out_of_sync: "Connection out of sync",
    out_of_sync:
      "Your connection has been out of sync for %(out_of_sync_seconds)s seconds.",
    want_to_reconnect:
      "If the connection can be recovered this message will disappear automatically.",
  },
  footer: {
    no_connection: "No Blockchain connection",
    nosync: "Your active node is out of sync",
  },
  pages: {
    logout: {
      heading: "Logout",
      title: "You have successfully logged out",
    },
    login: {
      heading: "Log into your account",
      title: "You have successfully logged out",
      dont_have_account: "Don’t have an account? ",
    },
    signUp: {
      heading: "Create your account",
      already_have_account: "Already have a Peerplays account? ",
    },
    dashboard: {
      heading: "Dashboard",
      marketTab: {
        heading: "Choose the trading pair you want to use",
      },
    },
    blocks: {
      heading: "Blocks",
      no_data: "No Data",
      stats_cards: {
        next_vote: "Next Vote Update",
        budget: "Remaining budget (hourly)",
      },
      blockchain: {
        blockchain: "Blockchain",
        heading: "PeerPlays Blockchain",
        current_block: "Current Block",
        last_irreversible_block: "Last irreversible block",
        supply: "Supply (%(symbol)s)",
        active_witness: "Active Witness",
        confirmation_time: "Confirmation Time",
        search_blocks: "Search Blocks",
        recent_blocks: "Recent Blocks",
        block: "Block",
        next: "Next",
        previous: "Previous",
        transactions: "Transactions",
        block_information: "Block Information",
        witness: "Witness",
      },
      assets: {
        heading: "PeerPlays Assets",
        assets: "Assets",
        search_assets: "Search Assets",
      },
      committees: {
        heading: "PeerPlays Committees",
        active_committees: "Active Committees",
        search_committees: "Search Committees",
        committees: "Committees",
      },
      witnesses: {
        heading: "PeerPlays Witnesses",
        active_witnesses: "Active Witnesses",
        block_reward: "Block Reward",
        monthly_earnings: "Monthly Earnings",
        search_witnesses: "Search Witnesses",
        witnesses: "Witnesses",
        current_witness: "Current Witness",
      },
      sons: {
        heading: "PeerPlays Sons",
        active_sons: "Active Sons",
        search_sons: "Search Sons",
        sons: "Sons",
      },
      fees: {
        heading: "PeerPlays Fees",
        fees: "Fees",
        search_fees: "Search Fees",
        general: "General",
        asset_specific: "Asset Specific",
        market_specific: "Market Specific",
        account_specific: "Account Specific",
        game_specific: "Game Specific",
        business_administration: "Bussiness Administration",
        show_less: "Show Less",
        show_more: "Show More",
      },
    },
    wallet: {
      heading: "Wallet",
      activities: "Activities",
      assets: "Assets",
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
      key_management: {
        heading: "key Management",
      },
      security: {
        heading: "Security",
      },
      membership: {
        heading: "Membership",
        upgrade_title: "Upgrade for %(feesCashback)s%%  Cashback",
        upgrade_description:
          "Every transaction on the Peerplays network is divided between the network and referrers. By registering to a Lifetime Membership the account will receive %(feesCashback)s%% cashback on every transaction fee paid. As a bonus it will also qualify to earn referral income from users registered with or referred to the network.",
        membership_price:
          "A Lifetime Membership price will change over time, right now it is only %(membershipPrice)s %(defaultToken)s.",
        fee_allocation: "Fee Allocation",
        fee_allocation_description:
          "Every time %(name)s pays a transaction fee, that fee is divided among several different accounts. The network takes a %(networkFee)s%% cut, and the Lifetime Member who referred %(name)s gets a %(lifetimeFee)s%% cut. The registrar is the account that paid the transaction fee to register %(name)s with the network. The registrar gets to decide how to divide the remaining %(referrerTotalFee)s%% between themselves and their own Affiliate Referrer program. %(name)s's registrar chose to share %(referrerFee)s%% of the total fee with the Affiliate Referrer and keep %(registrarFee)s%% of the total fee for themselves.",
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
          "Give this link to people you want to refer to Peerplays: %(link)s/signup/?r=%(name)s",
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
        heading: "Gamified Proof of Stake (GPOS)",
        tab: "GPOS",
        join_gpos:
          "Join GPOS by transferring your %(defaultToken)s to your GPOS balance.",
        consistently_participate:
          "Consistently participate in voting for the best Witnesses, Advisors, Proposals, and SONs. Share the exciting news and DApps available on Peerplays with others.",
        gpos_description:
          "The more value that comes into Peerplays blockchain through its operations, the more those that participate to help make it secure will earn!",
        rewards_label:
          "If you want to increase your participation rewards you can do it two ways:",
        rewards_way_first:
          "1. Transfer more %(defaultToken)s into your GPOS balance",
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
          heading: "GPOS - Power up",
          power_up_description:
            "When you Power Up your %(defaultToken)s on the Peerplays blockchain you are taking your first steps into participating in the Decentralized Autonomous Cooperative (DAC) that is the magic in blockchain tech. This means you will:",
          power_up_description_heading: "Notice",
          power_up_lists: {
            first: "Become a big part of something special on a global scale",
            second: "Earn participation rewards for your efforts",
            third: "Bragging rights to family and friends",
            fourth: "Stake your %(defaultToken)s while you participate",
            fifth: "Help secure the Peerplays blockchain",
          },
        },
        powerDown: {
          heading: "GPOS - Power down",
          power_down_description:
            "When you Power Down it will take 30 days for you to withdraw your %(defaultToken)s balance in full. You will continue to receive participation rewards during that time so long as you have been participating. After Power Down you can then use your %(defaultToken)s like any other cryptocurrency. This means you will:",
          power_down_description_heading: "Notice",
          power_down_lists: {
            first: "Still be a part of something special, just not as much",
            second: "No longer helping secure the Peerplays blockchain",
            third: "No longer earn participation rewards",
            fourth: "Lose bragging rights",
            fifth: "Stop staking your %(defaultToken)s",
          },
        },
      },
      sons: {
        heading: "PeerPlays SONs Voting",
        tab: "Sons",
      },
      witnesses: {
        heading: "PeerPlays Witnesses Voting",
        tab: "Witnesses",
      },
      proxy: {
        heading: "PeerPlays Proxy Voting",
        tab: "Proxy",
      },
      committees: {
        heading: "PeerPlays Committees Voting",
        tab: "Committees",
      },
    },
    user: {
      heading: "All Activity",
      discription: "Profile Page",
    },
    modal: {
      cancel: "Cancel",
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
    profile: "profile",
    mark_all_read: "Mark all as read",
    pdf: "PDF",
    csv: "CSV",
  },
  field: {
    options: {
      lock_wallet: "minutes ",
    },
    placeholder: {
      user_name: "Enter username",
      master_password: "Enter master password",
      withdraw_public_key: "Withdraw public key",
      withdraw_address: "Withdraw address",
      hive_blockchain_account: "Hive blockchain account",
      amount: "Amount",
      quantity: "Quantity",
      to: "To",
      memo: "Memo",
      price: "Price",
      total: "Total",
      re_enter_master_password: "Re-enter your auto-generated master password",
      confirm_password: "Confirm password",
      opening_balance: "Opening Balance:",
      new_balance: "New Balance:",
      available_balance: "Available Balance:",
      search_accounts: "Search Accounts",
      from: "From",
    },
    labels: {
      copy_bitcoin_address: "Copy your Bitcoin address",
      fetching_price: "Fetching price",
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
      buy_amount: "Buy amount",
      sell_amount: "Sell amount",
      seller: "seller",
      swapper: "Swapper",
      vesting_amount: "Vesting amount",
      withdrawal_amount: "Withdrawal amount",
      today: "Today",
      yesterday: "yesterday",
      order_to_cancel: "Order to cancel",
      threshold: "Threshold",
      desired_witnesses: "Desired witnesses",
      desired_committees: "Desired committees",
      desired_sons: "Desired sons",
      desired_proxy: "Desired Proxy",
    },
    comments: {
      deposit_hbd:
        "To deposit, %(assetSymbol)s , to , %(accountName)s, please send your funds to , son-account, on the Hive blockchain with the memo , %(accountName)s",
      public_memo: "This memo is public",
    },
    checkBoxes: {
      cannot_recover_my_lost_password:
        "I understand Peerplays cannot recover my lost password",
      securely_saved_my_password: "I have securely saved my password",
      enable_notifications: "Enable Notifications",
      key_management_group: ["Active", "Owner", "Memo"],
    },
    errors: {
      enter_amount: "Enter amount",
      insufficient_asset_balance: "Insufficient %(asset)s balance",
      insufficient_balance_for_fee: "Insufficient %(coreAsset)s for fee",
      not_enough_liquidity: "Not enough liquidity",
      sell_amount_should_greater: "Zero sell amount",
      buy_amount_should_greater: "Zero buy amount",
      no_key_for_password: "There is no %(role)s key for this password",
      login_first: "Please login first",
      checking_sons_status: "Please wait for checking the SONs network status",
      user_name_first: "Please provide a valid username first",
      same_account: "Same as your account",
      no_account: "Account not found",
      added_account: "Account is already added",
      premium_username:
        "This is a premium name which is not supported by this faucet.",
      username_limits:
        "Username should start with lowercase letter and should not contain capital letter or special characters or only digits",
      user_not_found: "User not found",
      password_incorrect: "Password incorrect",
      username_required: "Username is required",
      username_invalid: "Username is invalid",
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
      invalid_withdraw_hive_address: "Hive withdraw address is invalid",
      withdraw_pub_key_required: "Withdraw public key is required",
      sons_not_available_try_again:
        "SONs network is not available now. Please try again later!",
      transaction_unable: "Unable to process the transaction!",
      price_should_greater: "Price should be greater than 0",
      quantity_should_greater: "Quantity should be greater than 0",
      total_should_greater: "Total should be greater than 0",
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
        "Successfully Transferred %(amount)s %(asset)s to %(to)s",
      successfully_withdraw: "Successfully withdraw",
      successfully_withdrawn:
        "Successfully Withdrawn %(withdrawAmount)s %(symbol)s",
      successfully_deposited:
        "Successfully Deposited %(depositAmount)s %(symbol)s",
      limit_order_successfully: "You have successfully created a limit order",
      swap_order_successfully:
        "Your swap was completed and your received %(buyAmount)s %(buyAssetSymbol)s for %(sellAmount)s %(sellAssetSymbol)s",
      saved_changes: "You have successfully saved your changes",
      account_upgraded_successfully:
        "Your account successfully upgraded to lifetime membership account",
      published_proxy: "You have successfully published your proxy",
      published_votes: "You have successfully published your votes",
      canceled_limit_order:
        "You have successfully canceled #%(selectedOrderId)s order",
    },
  },
  settings: {
    api_closest: "Choose closest automatically",
    connection_error:
      "Unable to connect to API node %(url)s, falling back to known working nodes. Error was: %(error)s",
  },
  tableHead: {
    block_id: "Block ID",
    time: "Time",
    witness: "Witness",
    transaction: "Transaction",
    asset: "Asset",
    quote_asset: "Quote asset",
    available: "Available",
    change: "Change (24 hrs)",
    price: "Price",
    volume: "Volume",
    current_price: "Current Price",
    market_change: "Change",
    type: "Type",
    info: "Info",
    id: "ID",
    fee: "Fee",
    expiration: "Expiration",
    date: "Date",
    symbol: "Symbol",
    max_supply: "Max Supply",
    precision: "Precision",
    issuer: "Issuer",
    rank: "Rank",
    name: "Name",
    total_votes: "Total Votes",
    url: "Url",
    operation: "Operation",
    fee_type: "Fee Type",
    standard_fee: "Standard Fee",
    last_block: "Last Block",
    missed_blocks: "Missed Blocks",
    website: "Website",
    action: "Action",
    votes: "Votes",
    category: "Category",
    active: "Active",
    key: "key",
  },
  tooltips: {
    copy: "copy",
    copied: "copied",
    mark_read: "mark as read",
    mark_unread: "mark as unread",
    swap_transaction_type: "Transaction Type : Swap",
  },
};
