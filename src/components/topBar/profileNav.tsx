import { Avatar, Card } from "antd";

const { Meta } = Card;

const ProfileNav = (): JSX.Element => {
  return (
    // <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
    <Card style={{ width: 300, marginTop: 16 }}>
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="Card title"
        description="This is the description"
      />
    </Card>
  );
};

export default ProfileNav;
