import React, { ReactNode } from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader';

import { Tag } from '../components/tag.component';
import { withErrorHandling } from '../contexts/global-error-list.context';
import { IUserTagDTO } from '../dtos/user-tag-with-gifs.dto';
import { withFetchedList } from '../hocs/fetched-list.hoc';
import { tagService } from '../services';

export interface TagListProps {
  instances: IUserTagDTO[];
}
class TagList extends React.Component<TagListProps, {}>  {
  render(): ReactNode {
    return (
      <Container>
        {this.props.instances.map((i: IUserTagDTO) =>
          <Tag key={i.id} instance={i} />
        )}
      </Container>
    );
  }
}

export const FetchedTagList = withErrorHandling(withFetchedList(
  TagList,
  () => tagService.getTagsForHomepage(),
  tagService.eventBus,
  <Container><Loader active /></Container>
));
