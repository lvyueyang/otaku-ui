import React, { useEffect, useState } from 'react'
import { Telport } from '../telport/telport'
import { Button, ButtonProps } from '../button/button'
import './style.scss';


interface InputProps {
  value?: string
  placeholder?: string
  readonly?: boolean
  disabled?: boolean
  border?: boolean
  bgcolor?: string
  rows?: number
  cols?: number
  beforeIcon?: string
  beforeNode?: React.ReactNode
  afterIcon?: string
  clear?: boolean
  afterNode?: React.ReactNode
  showPassword?: boolean
  resize?: boolean
  className?: string
  style?: React.CSSProperties
  type?: 'text' | 'search' | 'password' | 'textarea'
  size?: 'mini' | 'small' | 'middle' | 'large'
  onChange?:(val: string) => void
  onInput?:(val: string) => void
  onFocus?:() => void
  onBlur?:() => void
  onClear?: () => void
  leftClick?:() => void
  rightClick?:() => void
}

export function Input (props: InputProps) {
  const {
    value,
    placeholder,
    readonly,
    disabled,
    cols,
    rows,
    className,
    style,
    beforeIcon,
    beforeNode,
    afterIcon,
    afterNode,
    clear,
    resize = true,
    showPassword = false,
    type = 'text',
    bgcolor = 'white',
    border = true,
    size = 'middle',
    onBlur,
    onFocus,
    onChange,
    onInput,
    onClear,
    leftClick,
    rightClick
  } = props

  const [
    inputValue,
    setInputValue
  ] = useState('')
  let [
    show,
    setShow
  ] = useState(showPassword)

  useEffect(
    () => {
      if (value) {
        setInputValue(value)
        onChange?.(inputValue)
      }
    },
    [value]
  )

  const change = (e: any) => {
    setInputValue(e.target.value)
    onChange?.(inputValue)
    onInput?.(inputValue)
  }

  return (
    <>
      {
        // text search password
        type !== 'textarea'
          ? (
              <div className={`otaku-input-box otaku-input-size-${size}`}>
                {
                  beforeNode ? <div className="otaku-input-before">{beforeNode}</div> : ''
                }
              <div
                className={`
                  otaku-input-container
                  ${className ?? ''}
                  ${afterNode ? 'otaku-input-after-border' : ''}
                  ${disabled ? 'otaku-input-disabled' : ''}
                `}
                style={{
                  borderWidth: border ? '1px' : '0px',
                  background: disabled ? '#f7f7f7' : bgcolor,
                  ...style
                }}>
                  {
                    beforeIcon ? <span className={`otaku-input-icon-left iconfont ${beforeIcon}`} onClick={leftClick}></span> : ''
                  }
                  <input
                    className={`
                      otaku-input
                    `}
                    placeholder={placeholder}
                    type={type}
                    value={inputValue}
                    disabled={disabled}
                    readOnly={readonly}
                    onChange={change}
                    onInput={change}
                    onBlur={onBlur}
                    onFocus={onFocus}
                  ></input>
                  {
                    type === 'password'
                      ? <span
                      className={`
                        otaku-input-icon-right 
                        iconfont 
                        show-password
                        ${show ? 'otaku-icon-eye-line' : show === false ? 'otaku-icon-eye-off-line' : ''}
                      `}
                      onClick={() => {
                        show = !show
                        setShow(show)
                      }}></span>
                      : ''
                  }
                  {
                    clear && inputValue.length !== 0
                      ? <span
                      className={`
                        otaku-input-icon-right 
                        iconfont 
                        close
                        otaku-icon-close-circle-line
                      `}
                      onClick={() => {
                        setInputValue('')
                        onClear?.()
                      }}></span>
                      : ''
                  }
                  {
                    afterIcon ? <span className={`otaku-input-icon-right iconfont ${afterIcon}`} onClick={rightClick}></span> : ''
                  }
                </div>
                {
                  afterNode ? <div className="otaku-input-after">{afterNode}</div> : ''
                }
              </div>
            )
          : (
          <div className={`otaku-textarea-container ${className}`} style={{
            borderWidth: border ? '1px' : '0px',
            background: bgcolor,
            ...style
          }}>
            <textarea
              className={`
                ${disabled ? 'otaku-input-disabled' : ''}
                otaku-input-textarea
                ${className}
              `}
              style={{
                background: bgcolor,
                resize: !resize ? 'none' : 'initial'
              }}
              cols={cols}
              rows={rows}
              placeholder={placeholder}
              value={inputValue}
              disabled={disabled}
              readOnly={readonly}
              onChange={change}
              onInput={change}
              onBlur={onBlur}
              onFocus={onFocus}></textarea>
          </div>
        )
      }
    </>
  )
}

interface SearchButtonProps {
  size: 'small' | 'middle' | 'large'
  inputProps?: InputProps,
  buttonProps?: ButtonProps,
  children: React.ReactNode
}

export const SearchButton = (props: SearchButtonProps) => {
  const {
    size = 'middle',
    inputProps,
    buttonProps,
    children
  } = props

  return (
    <div className={`otaku-search-button otaku-search-button-${size}`}>
      {/* <div> */}
        <Input
          {
            ...inputProps
          }
          size={size}
          type="search"
          afterNode={
            <Button
              {
              ...buttonProps
              }
              size={size}>
              {children}
            </Button>
          }
        ></Input>
      {/* </div> */}

      {/* <Telport className="otaku-search-popup">
        <ul className="otaku-search-list">
          {
            Array(10).fill(undefined).map((_, index) => {
              return (
              <li className="otaku-search-item">{index}</li>
              )
            })
          }
        </ul>
      </Telport> */}
    </div>
  )
}