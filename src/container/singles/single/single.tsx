import React, { FC } from 'react'
import NcImage from '@/components/NcImage/NcImage'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import SingleHeader from '../SingleHeader'
import { FragmentTypePostFullFields } from '@/container/type'

export interface SingleType1Props {
	post: FragmentTypePostFullFields
	showRightSidebar?: boolean
}

const SingleType1: FC<SingleType1Props> = ({ post, showRightSidebar }) => {
	//
	const {
		title,
		content,
		date,
		author,
		databaseId,
		excerpt,
		featuredImage,
		ncPostMetaData,
		categories,
	} = getPostDataFromPostFragment(post || {})
	//
	const hasFeaturedImage = !!featuredImage?.sourceUrl

	const imgWidth = featuredImage?.mediaDetails?.width || 1000
	const imgHeight = featuredImage?.mediaDetails?.height || 750
	return (
		<>
			<div className={`nc-PageSingle pt-8 lg:pt-16`}>
				<header className="container rounded-xl">
					<div
						className={
							!hasFeaturedImage && showRightSidebar
								? ''
								: `mx-auto max-w-screen-md`
						}
					>
						<SingleHeader post={{ ...post }} />
						{!hasFeaturedImage && (
							<div className="my-5 border-b border-neutral-200 dark:border-neutral-800" />
						)}
					</div>
				</header>

				{/* FEATURED IMAGE */}
				{!!hasFeaturedImage && (
					<NcImage
						alt={title}
						containerClassName="container my-10 sm:my-12"
						className={`mx-auto rounded-xl ${
							imgWidth <= 768 && ncPostMetaData?.showRightSidebar
								? 'w-full max-w-screen-md'
								: ''
						}`}
						src={featuredImage?.sourceUrl || ''}
						width={imgWidth}
						height={imgHeight}
						sizes={'(max-width: 1024px) 100vw, 1280px'}
						priority
						enableDefaultPlaceholder
					/>
				)}
			</div>
		</>
	)
}

export default SingleType1
