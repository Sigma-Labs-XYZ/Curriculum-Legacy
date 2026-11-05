
import React from 'react'
import clsx from 'clsx'
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types'
import AdmonitionLayout from '@theme/Admonition/Layout'
import IconTip from '@theme/Admonition/Icon/Tip'

function AISuggestionAdmonition(props) {
    const defaultProps = {
        type: 'ai-suggestion',
        icon: <IconTip />,
        title: 'AI Enhancement Opportunity',
    };

    return (
        <AdmonitionLayout
            {...defaultProps}
            {...props}
            className={clsx('alert alert--ai-suggestion', props.className)}>
            {props.children}
        </AdmonitionLayout>
    );
}

const AdmonitionTypes = {
    ...DefaultAdmonitionTypes,
    'ai-suggestion': AISuggestionAdmonition,
};

export default AdmonitionTypes;