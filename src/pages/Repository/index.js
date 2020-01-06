import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import api from '../../services/api';

import { Loading, Owner, IssueList, PaginationContainer } from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    page: 1,
    state: 'all',
    per_page: 5,
    hasMore: true,
  };

  componentDidMount() {
    this.loadRepository();
  }

  componentDidUpdate(_, prevState) {
    const { page, state } = this.state;
    if (prevState.page !== page || prevState.state !== state)
      this.loadRepository();
  }

  handleNextPage = e => {
    e.preventDefault();
    const { page, hasMore } = this.state;
    if (hasMore) this.setState({ page: page + 1 });
  };

  handlePreviousPage = e => {
    e.preventDefault();
    const { page } = this.state;
    if (page > 1) this.setState({ page: page - 1 });
  };

  handleFilter = e => {
    const { state } = this.state;
    if (state !== e.target.value) this.setState({ state: e.target.value });
  };

  async loadRepository() {
    const { match } = this.props;
    const { page, state, per_page } = this.state;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues, nextPage] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: { state, per_page, page },
      }),
      api.get(`/repos/${repoName}/issues`, {
        params: { state, per_page, page: page + 1 },
      }),
    ]);
    console.log(nextPage.data);
    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      hasMore: nextPage.data.length > 0,
    });
  }

  render() {
    const { repository, issues, loading, hasMore, page, state } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <PaginationContainer>
          {page > 1 && (
            <button
              type="button"
              className="previousPage"
              onClick={this.handlePreviousPage}
            >
              <FaArrowLeft />
            </button>
          )}
          {hasMore && (
            <button
              type="button"
              className="nextPage"
              onClick={this.handleNextPage}
            >
              <FaArrowRight />
            </button>
          )}
          <select
            className="state"
            defaultValue={state}
            onChange={this.handleFilter}
          >
            <option value="all">Todos</option>
            <option value="open">Abertos</option>
            <option value="closed">Fechados</option>
          </select>
        </PaginationContainer>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
