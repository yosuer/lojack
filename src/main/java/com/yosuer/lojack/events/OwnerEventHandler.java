package com.yosuer.lojack.events;

import static com.yosuer.lojack.config.WebSocketConfiguration.MESSAGE_PREFIX;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import com.yosuer.lojack.domain.Owner;

@Component
@RepositoryEventHandler(Owner.class)
public class OwnerEventHandler {

	private final SimpMessagingTemplate webSocket;
	private final EntityLinks entityLinks;

	public OwnerEventHandler(SimpMessagingTemplate webSocket, EntityLinks entityLinks) {
		this.webSocket = webSocket;
		this.entityLinks = entityLinks;
	}

	@HandleAfterCreate
	public void newOwner(Owner owner) {
		this.webSocket.convertAndSend(
				MESSAGE_PREFIX + "/newOwner", getPath(owner));
	}

	@HandleAfterDelete
	public void deleteOwner(Owner owner) {
		this.webSocket.convertAndSend(
				MESSAGE_PREFIX + "/deleteOwner", getPath(owner));
	}

	@HandleAfterSave
	public void updateOwner(Owner owner) {
		this.webSocket.convertAndSend(
				MESSAGE_PREFIX + "/updateOwner", getPath(owner));
	}

	/**
	 * Take an {@link Owner} and get the URI using Spring Data REST's {@link EntityLinks}.
	 *
	 * @param owner
	 */
	private String getPath(Owner owner) {
		return this.entityLinks
				.linkForSingleResource(owner.getClass(), owner.getId())
				.toUri()
				.getPath();
	}
}
