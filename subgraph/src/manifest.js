// Used to generate yaml files
module.exports = {
  specVersion: '0.0.4',
  description: 'Unlock Protocol & Associated contracts',
  features: ['nonFatalErrors', 'grafting'],
  schema: {
    file: './schema.graphql',
  },
  dataSources: [
    {
      name: 'Unlock',
      kind: 'ethereum',
      source: {
        abi: 'Unlock',
        address: '0x0000000000000000000000000000000000000000', // To be completed
        startBlock: 0, // To be completed!
      },
      mapping: {
        kind: 'ethereum/events',
        apiVersion: '0.0.7',
        language: 'wasm/assemblyscript',
        entities: ['NewLock'],
        abis: [
          {
            name: 'Unlock',
            file: './abis/UnlockV11.json',
          },
          {
            name: 'PublicLock',
            file: './abis/PublicLock.json',
          },
          {
            name: 'PublicLockV11',
            file: './abis/PublicLockV11.json',
          },
          {
            name: 'PublicLockV7',
            file: './abis/PublicLockV7.json',
          },
        ],
        eventHandlers: [
          {
            event: 'NewLock(indexed address,indexed address)',
            handler: 'handleNewLock',
          },
          {
            event: 'LockUpgraded(address,uint16)',
            handler: 'handleLockUpgraded',
          },
          {
            event: 'GNPChanged(uint256,uint256,address,uint256,address)',
            handler: 'handleGNPChanged',
          },
        ],
        file: './src/unlock.ts',
      },
      network: '', // To be completed
    },
  ],
  templates: [
    {
      kind: 'ethereum',
      name: 'PublicLock',
      source: {
        abi: 'PublicLock',
      },
      mapping: {
        kind: 'ethereum/events',
        apiVersion: '0.0.7',
        language: 'wasm/assemblyscript',
        entities: [
          'CancelKey',
          'ExpirationChanged',
          'ExpireKey',
          'KeyExtended',
          'KeyManagerChanged',
          'LockManagerAdded',
          'LockManagerRemoved',
          'PricingChanged',
          'Transfer',
        ],
        abis: [
          {
            name: 'PublicLock',
            file: './abis/PublicLock.json',
          },
          {
            name: 'PublicLockV11',
            file: './abis/PublicLockV11.json',
          },
          {
            name: 'PublicLockV12',
            file: './abis/PublicLockV12.json',
          },
          {
            name: 'PublicLockV8',
            file: './abis/PublicLockV8.json',
          },
          {
            name: 'PublicLockV7',
            file: './abis/PublicLockV7.json',
          },
        ],
        eventHandlers: [
          {
            event: 'LockConfig(uint256,uint256,uint256)',
            handler: 'handleLockConfig',
            receipt: true,
          },
          {
            event:
              'CancelKey(indexed uint256,indexed address,indexed address,uint256)',
            handler: 'handleCancelKey',
            receipt: true,
          },
          {
            event: 'ExpirationChanged(indexed uint256,uint256,bool)',
            handler: 'handleExpirationChangedUntilV11',
            receipt: true,
          },
          {
            event: 'ExpirationChanged(indexed uint256,uint256,uint256,bool)',
            handler: 'handleExpirationChanged',
            receipt: true,
          },
          {
            event: 'ExpireKey(indexed uint256)',
            handler: 'handleExpireKey',
            receipt: true,
          },
          {
            event: 'KeyExtended(indexed uint256,uint256)',
            handler: 'handleKeyExtended',
            receipt: true,
          },
          {
            event: 'KeyManagerChanged(indexed uint256,indexed address)',
            handler: 'handleKeyManagerChanged',
            receipt: true,
          },
          {
            event:
              'RoleGranted(indexed bytes32,indexed address,indexed address)',
            handler: 'handleRoleGranted',
            receipt: true,
          },
          {
            event: 'LockManagerAdded(indexed address)',
            handler: 'handleLockManagerAdded',
            receipt: true,
          },
          {
            event: 'LockManagerRemoved(indexed address)',
            handler: 'handleLockManagerRemoved',
            receipt: true,
          },
          {
            event: 'PricingChanged(uint256,uint256,address,address)',
            handler: 'handlePricingChanged',
            receipt: true,
          },
          {
            event: 'Transfer(indexed address,indexed address,indexed uint256)',
            handler: 'handleTransfer',
            receipt: true,
          },
          {
            event: 'RenewKeyPurchase(indexed address,uint256)',
            handler: 'handleRenewKeyPurchase',
            receipt: true,
          },
          {
            event: 'LockMetadata(string,string,string)',
            handler: 'handleLockMetadata',
            receipt: true,
          },
        ],
        file: './src/public-lock.ts',
      },
      network: '', // needs to be completed
    },
  ],
}