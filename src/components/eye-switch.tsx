import React, {SetStateAction, Dispatch, FC} from 'react';
import {useSwitch, VisuallyHidden, SwitchProps} from '@heroui/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface EyeSwitchProps {
    setHandler: Dispatch<SetStateAction<boolean>>;
}

export const EyeSwitch: FC<SwitchProps & EyeSwitchProps> = (props) => {
    const {setHandler} = props;
    const {Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps} = useSwitch(props);

    return (
        <div className='flex flex-col gap-2'>
            <Component {...getBaseProps()}>
                <VisuallyHidden>
                    <input {...getInputProps()} />
                </VisuallyHidden>
                <div
                    {...getWrapperProps()}
                    className={slots.wrapper({
                        class: [
                            'w-8 h-8',
                            'flex items-center justify-center',
                            'rounded-lg bg-default-100 hover:bg-default-200'
                        ]
                    })}
                    onClick={() => setHandler((val: boolean) => !val)}
                >
                    {!isSelected ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </div>
            </Component>
        </div>
    );
};
