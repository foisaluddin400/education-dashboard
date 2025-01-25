import { Spin } from "antd";

const Loading = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '80vw'
        }}>
            <Spin size="large" />
        </div>
    );
};

export default Loading;
