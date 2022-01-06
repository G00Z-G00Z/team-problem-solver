import { appColors, AvailableColorNames } from '../../types/AppColors'
import { Member, Team } from '../../types/interfaces'
import { MemberBuilder } from '../../components/TeamBuilder/MemberBuilder'
import { shallow, ShallowWrapper } from 'enzyme'
export {};
describe("Member Builder tests", () => {
  const teamColor: AvailableColorNames = "danger";

  let handleDelete: () => void;
  let handleUpdate: (value: Member) => void;
  let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  beforeEach(() => {
    handleDelete = jest.fn();
    handleUpdate = jest.fn();
    wrapper = shallow(
      <MemberBuilder
        member={{ name: "edy", color: "CTA", profileSeed: "" }}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        teamColor={teamColor}
      />
    );
  });

  test("Should render like snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Name input should have name", () => {
    const input = wrapper.find("input").at(0);

    expect(input).toBeTruthy();
    expect(input.props().value).toBe("edy");
  });
  test("Update function being called", () => {
    const input = wrapper.find("input").at(0);

    input.simulate("change", { target: { value: "hola" } });

    // because it must wait until it updates
    setTimeout(() => {
      expect(handleUpdate).toBeCalled();
      expect(input.props().value).toBe("hola");
    }, 550);
  });
  test("Delete function being called", () => {
    const input = wrapper.find("input").at(0);

    input.simulate("change", { target: { value: "hola" } });

    // because it must wait until it updates
    setTimeout(() => {
      expect(handleDelete).toBeCalled();
    }, 550);
  });
});
