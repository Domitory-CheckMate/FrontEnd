/** @jsxImportSource @emotion/react */
import './App.css';
import tw from 'twin.macro';

function App() {
  const Input = () => <input tw="border hover:border-black bg-red-500" />;
  return (
    <div css={tw`bg-red-100`}>
      <Input />
      안녕하세요
    </div>
  );
}

export default App;
