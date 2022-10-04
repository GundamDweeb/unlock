import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import SvgComponents from './svg'
import { RiWalletFill as WalletIcon } from 'react-icons/ri'
import { ActionButton } from './buttons/ActionButton'
import LogInSignUp from './LogInSignUp'
import { useAuthenticate } from '~/hooks/useAuthenticate'
import { SiBrave as BraveWalletIcon } from 'react-icons/si'
import { DownloadWallet } from '../interface/DownloadWallet'

interface LoginPromptProps {
  unlockUserAccount?: boolean
  onCancel?: () => void
  embedded?: boolean
  children?: React.ReactNode
  showTitle?: boolean
  backgroundColor?: string
  activeColor?: string
  injectedProvider?: any
}

export interface EthereumWindow extends Window {
  ethereum?: any
  web3?: any
}

const LoginPrompt = ({
  children,
  unlockUserAccount,
  onCancel,
  embedded,
  showTitle,
  backgroundColor,
  injectedProvider,
  activeColor,
}: LoginPromptProps) => {
  const [walletToShow, setWalletToShow] = useState('')
  const [isDownloadWallet, setIsDownloadWallet] = useState(false)

  const { authenticateWithProvider } = useAuthenticate({
    injectedProvider,
  })

  const ButtonIcon = useMemo(() => {
    const walletIcons = {
      metamask: <SvgComponents.Metamask width={32} />,
      brave: <BraveWalletIcon size={20} className="m-1.5" />,
      frame: <SvgComponents.Frame width={32} />,
      status: <SvgComponents.Status width={32} />,
      default: <WalletIcon size={20} className="m-1.5" />,
    }

    if (window.ethereum?.isMetaMask) {
      return walletIcons.metamask
    }

    // @ts-expect-error no typing
    if (window.ethereum?.isBraveWallet) {
      return walletIcons.brave
    }

    // @ts-expect-error no typing
    if (window.ethereum?.isFrame) {
      return walletIcons.frame
    }

    // @ts-expect-error no typing
    if (window.ethereum?.isStatus) {
      return walletIcons.status
    }

    return walletIcons.default
  }, [])

  const onInjectedHandler = () => {
    if (window.ethereum) {
      return authenticateWithProvider('METAMASK')
    }

    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPhone/i)
    ) {
      return authenticateWithProvider('WALLET_CONNECT')
    }

    setIsDownloadWallet(true)
  }

  return (
    <Container embedded={!!embedded}>
      <DownloadWallet
        isOpen={isDownloadWallet}
        setIsOpen={setIsDownloadWallet}
      />
      {!walletToShow && (
        <>
          {showTitle && <SubHeading>Connect a wallet</SubHeading>}

          {children}

          <WalletButton
            color={backgroundColor}
            activeColor={activeColor}
            onClick={onInjectedHandler}
          >
            {ButtonIcon}
            In browser wallet
          </WalletButton>

          <WalletButton
            color={backgroundColor}
            activeColor={activeColor}
            onClick={() => authenticateWithProvider('WALLET_CONNECT')}
          >
            <SvgComponents.WalletConnect fill="var(--blue)" />
            WalletConnect
          </WalletButton>

          <WalletButton
            color={backgroundColor}
            activeColor={activeColor}
            onClick={() => authenticateWithProvider('COINBASE')}
          >
            <SvgComponents.CoinbaseWallet fill="var(--blue)" />
            Coinbase Wallet
          </WalletButton>

          {unlockUserAccount && (
            <WalletButton
              color={backgroundColor}
              activeColor={activeColor}
              disabled={!unlockUserAccount}
              onClick={() => {
                setWalletToShow('unlock')
              }}
            >
              <SvgComponents.Unlock fill="var(--brand)" />
              Unlock Account
            </WalletButton>
          )}
        </>
      )}

      {walletToShow == 'unlock' && unlockUserAccount && (
        <LogInSignUp
          network={1} // default to mainnet?
          embedded={embedded}
          onCancel={onCancel}
          login
          useWallet={() => setWalletToShow('')}
        />
      )}
    </Container>
  )
}
const SubHeading = styled.h2`
  margin-bottom: 10px;
  font-family: 'IBM Plex Serif', serif;
  font-size: 32px;
  line-height: 42px;
  font-weight: 300;
  color: var(--darkgrey);
`

const WalletButton = styled(ActionButton).attrs({
  fontColor: 'var(--dimgrey)',
  fontActiveColor: 'var(--dimgrey)',
  borderColor: 'transparent',
  activeBorderColor: 'transparent',
})`
  margin: 10px 0px;

  display: flex;
  text-align: left;
  margin: 10px 0px;
  align-items: center;

  a,
  a:hover,
  a:visited,
  a:active {
    color: inherit !important;
  }

  svg {
    margin-right: 10px;
    width: 32px;
    height: 32px;
  }
`

interface ContainerProps {
  embedded?: boolean
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${({ embedded }) => (!embedded ? '400px' : '')};
  justify-self: center;
`

LoginPrompt.defaultProps = {
  unlockUserAccount: false,
  onCancel: null,
  embedded: false,
  children: null,
  showTitle: true,
  backgroundColor: 'var(--offwhite)',
  activeColor: 'var(--white)',
  injectedProvider: null,
}

export default LoginPrompt
