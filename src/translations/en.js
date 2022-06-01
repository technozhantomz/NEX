export const en = {
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
        description: "%(user)s , updated account data",
      },
      account_upgrade: {
        title: "Upgrade Account",
        description: "%(user)s, upgraded account to lifetime member",
      },
      account_whitelist: {
        title: "Account whitelist",
        description: "%(issuer)s, %(status)s the account, %(listed)s",
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
        description: "%(from)s, funded %(symbol)s fee pool with %(amount)s",
      },
      asset_global_settle: {
        title: "Global asset settlement",
      },
      asset_issue: {
        title: "Issue asset",
        description:
          "%(issuer)s, issued %(assetAmount)s %(symbol) to, %(receiver)s",
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
      son_wallet_recreate: {
        title: "Recreate SON wallet",
      },
      son_wallet_update: {
        title: "Update SON wallet",
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
      },
      vesting_balance_withdraw: {
        title: "Withdraw vesting balance",
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
    logout: "Logout",
    login: "Log in",
    deposit: "Deposit",
    withdraw: "Withdraw",
    market: "Market",
    generate_bitcoin_address: "Generate Bitcoin address",
    login_and_generate_bitcoin_address: "Log in & Generate Bitcoin Address",
    dont_have_peerplays_account: "Dont have a Peerplays account? ",
    log_in_withdraw: "Log in & Withdraw",
    log_in_deposit_hbd_hive: "Log in & Deposit",
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
      blockchain: {
        blockchain: "Blockchain",
        heading: "PeerPlays Blockchain",
        current_block: "Current Block",
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
      },
      fees: {
        heading: "PeerPlays Fees",
        fees: "Fees",
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
  },
  activitiesDescription: {},
};
