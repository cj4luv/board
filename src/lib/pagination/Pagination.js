import React, { Component } from "react";
import PropTypes from "prop-types";
import paginator from "./Paginator";
import Page from "./Page";
import cx from "classnames";

export default class Pagination extends Component {
    static propTypes = {
      totalItemsCount: PropTypes.number.isRequired,
      onChange: PropTypes.func.isRequired,
      activePage: PropTypes.number,
      itemsCountPerPage: PropTypes.number,
      pageRangeDisplayed: PropTypes.number,
      prevPageText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
      nextPageText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
      lastPageText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
      firstPageText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
      disabledClass: PropTypes.string,
      hideDisabled: PropTypes.bool,
      hideNavigation: PropTypes.bool,
      innerClass: PropTypes.string,
      itemClass: PropTypes.string,
      linkClass: PropTypes.string,
      activeClass: PropTypes.string,
      activeLinkClass: PropTypes.string,
      linkClassFirst: PropTypes.string,
      linkClassPrev: PropTypes.string,
      linkClassNext: PropTypes.string,
      linkClassLast: PropTypes.string,
    }

    static defaultProps = {
      itemsCountPerPage: 10,
      pageRangeDisplayed: 5,
      activePage: 1,
      prevPageText: "⟨",
      firstPageText: "«",
      nextPageText: "⟩",
      lastPageText: "»",
      innerClass: "pagination",
      itemClass: undefined,
      linkClass: undefined,
      activeLinkClass: undefined
    }

    buildPages() {
        const pages = [];
        const {
            itemsCountPerPage,
            pageRangeDisplayed,
            activePage,
            prevPageText,
            nextPageText,
            firstPageText,
            lastPageText,
            totalItemsCount,
            onChange,
            activeClass,
            itemClass,
            activeLinkClass,
            disabledClass,
            hideDisabled,
            hideNavigation,
            linkClass,
            linkClassFirst,
            linkClassPrev,
            linkClassNext,
            linkClassLast,
            nextStyle,
            preStyle,
            lastStyle,
            firstStyle,
            pageStyle
        } = this.props;

        const paginationInfo = new paginator(itemsCountPerPage, pageRangeDisplayed)
            .build(totalItemsCount, activePage);

        for(let i = paginationInfo.first_page; i <= paginationInfo.last_page; i++) {
            pages.push(
                <Page
                    isActive={i === activePage}
                    key={i}
                    itemStyle={pageStyle}
                    itemText={{
                      color: '#2c2c2c',
                      fontSize: 16,
                      textDecoration: i === activePage ? 'underline':'none',
                      cursor: 'pointer',
                    }}
                    pageNumber={i}
                    pageText={i + ""}
                    onClick={onChange}
                    itemClass={itemClass}
                    linkClass={linkClass}
                    activeClass={activeClass}
                    activeLinkClass={activeLinkClass}
                />
            );
        }

        ((hideDisabled && !paginationInfo.has_previous_page) || activePage === 1 || hideNavigation) || pages.unshift(
            <Page
                key={"prev" + paginationInfo.previous_page}
                pageNumber={paginationInfo.previous_page}
                onClick={onChange}
                pageText={prevPageText}
                itemStyle={preStyle}
                isDisabled={!paginationInfo.has_previous_page}
                itemClass={itemClass}
                linkClass={cx(linkClass, linkClassPrev)}
                disabledClass={disabledClass}
            />
        );

        ((hideDisabled && !paginationInfo.has_previous_page) || activePage === 1 || hideNavigation) || pages.unshift(
            <Page
                key={"first"}
                pageNumber={1}
                onClick={onChange}
                pageText={firstPageText}
                itemStyle={firstStyle}
                isDisabled={!paginationInfo.has_previous_page}
                itemClass={itemClass}
                linkClass={cx(linkClass, linkClassFirst)}
                disabledClass={disabledClass}
            />
        );

        ((hideDisabled && !paginationInfo.has_next_page) || activePage === paginationInfo.total_pages || hideNavigation) || pages.push(
            <Page
                key={"next" + paginationInfo.next_page}
                pageNumber={paginationInfo.next_page}
                onClick={onChange}
                pageText={nextPageText}
                itemStyle={nextStyle}
                isDisabled={!paginationInfo.has_next_page}
                itemClass={itemClass}
                linkClass={cx(linkClass, linkClassNext)}
                disabledClass={disabledClass}
            />
        );

        ((hideDisabled && !paginationInfo.has_next_page) || activePage === paginationInfo.total_pages || hideNavigation) || pages.push(
            <Page
                key={"last"}
                pageNumber={paginationInfo.total_pages}
                onClick={onChange}
                pageText={lastPageText}
                itemStyle={lastStyle}
                isDisabled={paginationInfo.current_page === paginationInfo.total_pages}
                itemClass={itemClass}
                linkClass={cx(linkClass, linkClassLast)}
                disabledClass={disabledClass}
            />
        );

        return pages;
    }

    render() {
        const pages = this.buildPages();
        return (
            <ul style={styles.container}
              className={this.props.innerClass}>
              {pages}
            </ul>
        );
    }
}

const styles = {
  container: {
    marginTop: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 26,
  }
}
