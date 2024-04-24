import Creatable from 'react-select/creatable';
import Select from 'react-select';
import styled from 'styled-components';

export const NormalSelect = styled(Select)`
  color: ${(prop) => prop.theme['gray-400']};
  background: ${(prop) => prop.theme['gray-900']};
  display: flex;
  padding: 0.75rem;
  border-radius: 6px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);

  .react-select__single-value {
    color: ${(prop) => prop.theme['gray-100']};
  }

  .react-select__indicators {
    .react-select__indicator-separator {
      background-color: transparent;
    }

    .react-select__dropdown-indicator {
      background-color: transparent;
      cursor: pointer;
    }
  }

  .react-select__control {
    width: 100%;
    background: transparent;
    border: none;
    box-shadow: 0 0 0 0px ${({ theme }) => theme['green-500']} !important;

    .react-select__value-container {
      cursor: pointer;

      .react-select__input-container {
        .react-select__input {
          color: ${(prop) => prop.theme['gray-400']} !important;
          border: none !important;
          outline: none !important;

          &:focus {
            box-shadow: 0 0 0 0px ${({ theme }) => theme['green-500']} !important;
            border: none !important;
            outline: none !important;
          }
        }
      }
    }
  }

  .react-select__menu {
    color: ${(prop) => prop.theme['gray-400']};

    .react-select__menu-list {
      background: ${(prop) => prop.theme['gray-900']};
    }

    .react-select__option {
      background: ${(prop) => prop.theme['gray-900']};
      color: ${(prop) => prop.theme['gray-400']};

      &:hover {
        background: ${(prop) => prop.theme['green-300']};
        color: ${(prop) => prop.theme['gray-900']};
        cursor: pointer;
      }
    }

    .react-select__option--is-selected {
      background: ${(prop) => prop.theme['green-300']};
      color: ${(prop) => prop.theme['gray-900']};
    }
  }
`;

export const CreatableSelect = styled(Creatable)`
  color: ${(prop) => prop.theme['gray-400']};
  background: ${(prop) => prop.theme['gray-900']};
  display: flex;
  padding: 0.75rem;
  border-radius: 6px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);

  .react-select__single-value {
    color: ${(prop) => prop.theme['gray-100']};
  }

  .react-select__indicators {
    .react-select__indicator-separator {
      background-color: transparent;
    }

    .react-select__dropdown-indicator {
      background-color: transparent;
      cursor: pointer;
    }
  }

  .react-select__control {
    width: 100%;
    background: transparent;
    border: none;
    box-shadow: 0 0 0 0px ${({ theme }) => theme['green-500']} !important;

    .react-select__value-container {
      cursor: pointer;

      .react-select__input-container {
        .react-select__input {
          color: ${(prop) => prop.theme['gray-400']} !important;
          border: none !important;
          outline: none !important;

          &:focus {
            box-shadow: 0 0 0 0px ${({ theme }) => theme['green-500']} !important;
            border: none !important;
            outline: none !important;
          }
        }
      }
    }
  }

  .react-select__menu {
    color: ${(prop) => prop.theme['gray-400']};

    .react-select__menu-list {
      background: ${(prop) => prop.theme['gray-900']};
    }

    .react-select__option {
      background: ${(prop) => prop.theme['gray-900']};
      color: ${(prop) => prop.theme['gray-400']};

      &:hover {
        background: ${(prop) => prop.theme['green-300']};
        color: ${(prop) => prop.theme['gray-900']};
        cursor: pointer;
      }
    }

    .react-select__option--is-selected {
      background: ${(prop) => prop.theme['green-300']};
      color: ${(prop) => prop.theme['gray-900']};
    }
  }
`;
