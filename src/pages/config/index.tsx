import ProCard from '@ant-design/pro-card';
import { Container } from '@/components/common';
import BlackListSettings from '@/components/settings/BlackListSettings';

const SystemSettings = () => {
  return (
    <Container>
      <ProCard title='黑名单设置'>
        <BlackListSettings />
      </ProCard>
    </Container>
  );
};

export default SystemSettings;
