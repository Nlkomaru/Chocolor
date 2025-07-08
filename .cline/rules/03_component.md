# コンポーネントについて

## コンポーネントの命名規則

- コンポーネントの命名規則は、kebab-caseを使用してください。

## コンポーネントのディレクトリ構成

- コンポーネントは、`app/components`ディレクトリ配下に配置してください。
- コンポーネントは、
    - `app/components/atoms`
    - `app/components/molecules`
    - `app/components/organisms`
    - `app/components/templates`
    の4つのディレクトリに分類してください。
- organisms < molecules < atomsの順で子になっていくため上位を参照することがないようにしてください。(moleculesがorganismsを参照することはない)

## コンポーネントの実装

- 実装の際には、stateのバケツリレーを避けるためにjotaiを利用してください。
- コンポーネントを記述した場合、storybookのstoryを記述してください。

## 例

### SVA

```tsx
import { sva } from '../styled-system/css'
 
const checkbox = sva({
  slots: ['root', 'control', 'label'],
  base: {
    root: { display: 'flex', alignItems: 'center', gap: '2' },
    control: { borderWidth: '1px', borderRadius: 'sm' },
    label: { marginStart: '2' }
  },
  variants: {
    size: {
      sm: {
        control: { width: '8', height: '8' },
        label: { fontSize: 'sm' }
      },
      md: {
        control: { width: '10', height: '10' },
        label: { fontSize: 'md' }
      }
    }
  },
  defaultVariants: {
    size: 'sm'
  }
})

import { css } from '../styled-system/css'
import { checkbox } from './checkbox.recipe'
 
const Checkbox = () => {
  const classes = checkbox({ size: 'sm' })

  return (
    <label className={classes.root}>
      <input type="checkbox" className={css({ srOnly: true })} />
      <div className={classes.control} />
      <span className={classes.label}>Checkbox Label</span>
    </label>
  )
}
```