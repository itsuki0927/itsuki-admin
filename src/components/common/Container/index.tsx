import type { PageContainerProps } from '@ant-design/pro-layout'
import { PageContainer } from '@ant-design/pro-layout'
import type { FC } from 'react'

type ContainerProps = Omit<PageContainerProps, 'breadcrumbRender'>

const Container: FC<ContainerProps> = ({ children, ...rest }) => {
  return (
    <PageContainer {...rest} breadcrumbRender={false}>
      {children}
    </PageContainer>
  )
}

export default Container
