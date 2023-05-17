#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')
const networksConfig = require('@unlock-protocol/networks')
const writeYamlFile = require('write-yaml-file')
const manifest = require('../src/manifest.js')

const networkFilePath = path.join(__dirname, '..', 'networks.json')
const manifestFilePath = path.join(__dirname, '..', 'subgraph.yaml')

// Some networks have a custom networkName
const networkName = (n) => {
  return networksConfig[n].subgraph.networkName || n
}

const generateManifestFile = async (network) => {
  console.log('generate the manifest file!')
  const { previousDeploys } = networksConfig[network]

  // If the network has multiple deploys of Unlock, we need to add them to the manifest!
  // Note: the networks file will still be used...
  const dataSource = manifest.dataSources.find(
    (source) => source.name === 'Unlock'
  )
  previousDeploys.forEach((previous, i) => {
    const newSource = {
      ...dataSource,
      name: `Unlock${i}`,
    }
    newSource.source.address = previous.unlockAddress
    newSource.source.startBlock = previous.startBlock
    manifest.dataSources.push(newSource)
  })

  await writeYamlFile(manifestFilePath, manifest, { noRefs: true })
  console.log(`Manifest file saved at: ${manifestFilePath}`)
}

module.exports = {
  networkName,
  generateManifestFile,
}
