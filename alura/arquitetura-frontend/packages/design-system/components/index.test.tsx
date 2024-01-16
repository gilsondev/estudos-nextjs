import { customRender } from "@alura/test-commons/react-testing-library";
import { Text } from "./Text";

const render = customRender();

describe("<Text />", () => {
  it("renders h1 tag", () => {
    const { container } = render(<Text tag="h1">Sample Text</Text>);

    expect(container).toMatchSnapshot();
  });
});
